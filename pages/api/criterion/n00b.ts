import { handler } from '@/lib/handler'
import { ethers } from 'ethers'

import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  return handler('n00b', req, res, async (userAddress: string) => {
    // We need to get the last transaction for each address!
    // TODO
    return 3600
  })
}
