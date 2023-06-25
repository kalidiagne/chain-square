import { ethers } from 'ethers'
import chainSquareConfig from '@/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'
import { transfer } from '@/lib/transfer'

// eslint-disable-next-line max-params
export async function handler(
  criterion: string,
  req: NextApiRequest,
  res: NextApiResponse,
  compute: any
) {
  const userAddress = req.query.userAddress?.toString()
  if (!userAddress) {
    return res.status(404).json({ error: `Missing userAddress` })
  }

  let score = await prisma.scores.findFirst({
    where: { userAddress, criterion },
  })
  if (!score || new Date().getTime() - score.updatedAt.getTime() > 1000 * 60 * 60) {
    // For each chain, we need to see
    // mainnet, optimism, gnosis chain, polygon, arbitrum
    const scoreValue = await compute(userAddress)

    // upsert
    score = await prisma.scores.upsert({
      where: {
        criterion_userAddress: { userAddress, criterion },
      },
      update: {
        score: scoreValue,
        updatedAt: new Date(),
      },
      create: {
        userAddress,
        criterion,
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
      criterion,
      score: {
        gt: score.score,
      },
    },
  })

  const rank = aggregations._count.score + 1

  // Get the top to see if we need to change!
  const top = await prisma.scores.findMany({
    where: {
      criterion,
    },
    orderBy: {
      score: 'desc',
    },
    take: 3,
  })
  await transfer(chainSquareConfig.criteria.chains.contract, top)

  return res.json({ ...score, rank })
}
