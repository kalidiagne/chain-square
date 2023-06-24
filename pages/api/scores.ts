import { ethers } from 'ethers'
import chainSquareConfig from '@/config'
import { PublicLockV13 } from '@unlock-protocol/contracts'

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const criterion = req.query.criterion?.toString()
  if (!criterion) {
    return res.status(404).json({ error: `No criterion` })
  }
  // @ts-expect-error
  if (!chainSquareConfig.criteria[criterion]) {
    return res.status(404).json({ error: `Invalid criterion` })
  }

  const top = await prisma.scores.findMany({
    where: {
      criterion,
    },
    orderBy: {
      score: 'desc',
    },
    take: 3,
  })
  return res.json(top)
}
