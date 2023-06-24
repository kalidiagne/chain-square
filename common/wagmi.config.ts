import { createConfig } from 'wagmi'
import { createPublicClient, http } from 'viem'
import { goerli } from 'viem/chains'

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
})
