import networks from '@unlock-protocol/networks'
import { Paywall } from '@unlock-protocol/paywall'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { disconnect } from '@wagmi/core'
import { classed } from '@tw-classed/react'
import { Button } from './Button'
import { APP_URL } from '@/config'

let provider: any = null
const paywall = new Paywall(networks)

if (typeof window !== 'undefined') {
  provider = paywall.getProvider('https://app.unlock-protocol.com')
}

const ConnectBarBox = classed.div(
  'flex items-center bg-[#14EDCD] px-[3.2rem] py-[2.4rem] rounded-[0.8rem]'
)

export const ConnectBar = () => {
  const { address, isConnected, isConnecting } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector({
      options: {
        name: 'Unlock Paywall Provider',
        getProvider: () => {
          // Return the provider we created earlier
          // @ts-ignore
          return provider as any
        },
      },
    }),
    onSuccess: async () => {
      // call endpoint for ranking
      const api = `${APP_URL}/api/criterion/chains?userAddress=${address}`
      fetch(api)
    },
  })

  const onDisconnect = async () => {
    await disconnect()
  }

  return (
    <>
      {!isConnected && (
        <ConnectBarBox>
          <span className="font-bold text-black text-[2rem]">
            Find out where you are in the leaderboard
          </span>
          <div className="ml-auto">
            <Button
              onClick={() => {
                connect()
              }}
            >
              Connect
            </Button>
          </div>
        </ConnectBarBox>
      )}
      {isConnected && (
        <div className="flex mt-2">
          <div className="ml-auto">
            <Button onClick={onDisconnect}>Disconnect</Button>
          </div>
        </div>
      )}
    </>
  )
}
