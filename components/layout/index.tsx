import { ReactNode } from 'react'
import { ConnectButton } from '../ConnectButton'
import Head from 'next/head'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex flex-col h-screen mx-auto">
        <div className="ml-auto"></div>
        <div className="md:container">{children}</div>
      </div>
    </>
  )
}
