import networks from '@unlock-protocol/networks'
import { Paywall } from '@unlock-protocol/paywall'
import { useMemo } from 'react'
import { useAccount, useConnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

export const ConnectButton = () => {
  const { address, isConnected } = useAccount()

  // Retrieve the wallet provider from the paywall library
  const provider = useMemo(() => {
    if (typeof window === 'undefined') {
      const paywall = new Paywall(networks)
      return paywall.getProvider('https://app.unlock-protocol.com')
    }
  }, [])

  const { connect } = useConnect({
    connector: new InjectedConnector({
      options: {
        name: 'Unlock Paywall Provider',
        getProvider: () => {
          // Return the provider we created earlier
          return provider
        },
      },
    }),
  })

  return (
    <>
      {!isConnected && (
        <button
          onClick={() => {
            connect()
          }}
          className="p-2 transition-colors duration-200 border-2 border-black rounded-md hover:bg-black hover:text-white"
        >
          Connect
        </button>
      )}
      {isConnected && <p>Welcome back {address?.slice(0, 8)}&hellip;</p>}
    </>
  )
}
