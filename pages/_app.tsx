import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { AppProps } from 'next/app'
import { Layout } from '@/components'
import '@/styles/global.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from '@/common/wagmi.config'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page) => (
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <Layout>{page}</Layout>
        </QueryClientProvider>
      </WagmiConfig>
    ))

  return getLayout(<Component {...pageProps} />)
}
