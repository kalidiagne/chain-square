import { ethers } from 'ethers'
import chainSquareConfig from '@/config'
import { PublicLockV13 } from '@unlock-protocol/contracts'

import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tokenId = req.query.id
  if (!tokenId) {
    return res.status(404).json({ error: `No token id provided` })
  }

  const provider = new ethers.providers.JsonRpcProvider(`https://rpc.unlock-protocol.com/100`, 100)

  // From tokenId, get owner
  const contract = new ethers.Contract(chainSquareConfig.contract, PublicLockV13.abi, provider)

  const ownerOf = await contract.ownerOf(tokenId)
  if (ownerOf === ethers.constants.AddressZero) {
    return res.status(404).json({ error: 'Token not found!' })
  }

  const attributes = await prisma.scores.findMany({
    where: {
      userAddress: ownerOf,
    },
  })

  const metadata = {
    name: 'ChainSquare',
    description: "A NFT that represents its owner's ChainScore.",
    external_url: 'TK',
    image: 'TK',
    attributes,
  }

  return res.json(metadata)
}
