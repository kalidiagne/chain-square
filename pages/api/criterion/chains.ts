import { ethers } from 'ethers'
import chainSquareConfig from '@/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'
import { transfer } from '@/lib/transfer'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userAddress = req.query.userAddress?.toString()
  if (!userAddress) {
    return res.status(404).json({ error: `Missing userAddress` })
  }

  let score = await prisma.scores.findFirst({
    where: { userAddress, criterion: 'chains' },
  })
  if (!score || new Date().getTime() - score.updatedAt.getTime() > 1000 * 60 * 60) {
    // For each chain, we need to see
    // mainnet, optimism, gnosis chain, polygon, arbitrum
    const chainIds = [1, 10, 100, 137, 42161]
    const transactionCounts = await Promise.all(
      chainIds.map(async (id) => {
        const provider = new ethers.providers.JsonRpcProvider(
          `https://rpc.unlock-protocol.com/${id}`,
          id
        )
        const transactionCount = await provider.getTransactionCount(userAddress.toString())
        return { transactionCount, chainId: id }
      })
    )
    const scoreValue = transactionCounts.reduce(
      (acc, { transactionCount }) => (transactionCount ? acc + 1 : acc),
      0
    )

    // upsert
    score = await prisma.scores.upsert({
      where: {
        criterion_userAddress: { userAddress, criterion: 'chains' },
      },
      update: {
        score: scoreValue,
        updatedAt: new Date(),
      },
      create: {
        userAddress,
        criterion: 'chains',
        score: scoreValue,
        updatedAt: new Date(),
        createdAt: new Date(),
      },
    })
  }

  // We get the rank at any point
  const aggregations = await prisma.scores.aggregate({
    _count: {
      score: true,
    },
    where: {
      criterion: 'chains',
      score: {
        gt: score.score,
      },
    },
  })

  const rank = aggregations._count.score + 1

  // Get the top to see if we need to change!
  const top = await prisma.scores.findMany({
    where: {
      criterion: 'chains',
    },
    orderBy: {
      score: 'desc',
    },
    take: 3,
  })
  await transfer(chainSquareConfig.criteria.chains.contract, top)

  return res.json({ ...score, rank })
}
