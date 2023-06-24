import { ethers } from 'ethers'
import chainSquareConfig from '@/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userAddress = req.query.userAddress?.toString()
  if (!userAddress) {
    return res.status(404).json({ error: `Missing userAddress` })
  }

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
  const score = transactionCounts.reduce(
    (acc, { transactionCount }) => (transactionCount ? acc + 1 : acc),
    0
  )

  // upsert
  const object = await prisma.scores.upsert({
    where: {
      criterion_userAddress: { userAddress, criterion: 'chains' },
    },
    update: {
      score,
    },
    create: {
      userAddress,
      criterion: 'chains',
      score,
    },
  })

  return res.json(object)
}
