import { handler } from '@/lib/handler'
import { ethers } from 'ethers'

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return handler('test-transactions', req, res, async (userAddress: string) => {
    const chainId = 5
    const provider = new ethers.providers.JsonRpcProvider(
      `https://rpc.unlock-protocol.com/${chainId}`,
      chainId
    )
    return await provider.getTransactionCount(userAddress.toString())
  })
}
