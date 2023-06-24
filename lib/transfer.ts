import { DefenderRelaySigner, DefenderRelayProvider } from 'defender-relay-client/lib/ethers'
import { PublicLockV13 } from '@unlock-protocol/contracts'
import { ethers } from 'ethers'

const apiKey = 'BdiodDUXR8TehJykoYTgLoeFRJKJCxzo'

// This function transfers ownerhip of an NFT based on rank
export const transfer = async (contractAddress: string, top: any) => {
  if (!process.env['DEFENDER_API_SECRET']) {
    throw new Error('Missing DEFENDER_API_SECRET')
  }
  const credentials = { apiKey, apiSecret: process.env['DEFENDER_API_SECRET'] }
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' })
  const contract = new ethers.Contract(contractAddress, PublicLockV13.abi, signer)
  const oldOwners = await Promise.all([1, 2, 3].map((rank) => contract.ownerOf(rank)))
  for (let i = 1; i <= 3; i++) {
    if (oldOwners[i - 1] !== top[i - 1].userAddress) {
      contract.transferFrom(oldOwners[i - 1], top[i - 1].userAddress, i)
    }
  }
}
