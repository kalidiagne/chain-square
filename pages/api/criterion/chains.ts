import { handler } from '@/lib/handler'
import { ethers } from 'ethers'

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return handler('chains', req, res, async (userAddress: string) => {
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
    return transactionCounts.reduce(
      (acc, { transactionCount }) => (transactionCount ? acc + 1 : acc),
      0
    )
  })
}
