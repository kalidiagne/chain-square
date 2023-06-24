import { createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { gnosis } from 'viem/chains'

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: gnosis,
    transport: http(),
  }),
})
