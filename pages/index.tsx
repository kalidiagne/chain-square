import { ConnectBar } from '@/components/ConnectBar'
import Hero from '@/components/Hero'
import { LeaderBoardBox } from '@/components/LeaderBoardBox'
import { UserBox } from '@/components/UserBox'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chain Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-[10rem] pb-[20rem] px-[2rem]">
        <section className="relative top-0 flex justify-center">
          <img src="/logo-mark.svg" alt="logo" />
        </section>

        <section>
          <div className="mt-[2rem] mb-[4rem]">
            <Hero />
          </div>
          <ConnectBar />
          <h1 className="mt-[10rem] font-luckiest text-[3rem] md:text-[6.4rem] tracking-[0.5rem] md:tracking-[2.5rem] text-[#FF7043] text-center">
            Leaderboard
          </h1>
        </section>

        <section className="mt-[2rem] grid grid-cols-1 md:grid-cols-3 justify-between gap-[2rem] md:gap-[8rem]">
          <LeaderBoardBox
            title="Chains"
            description="The number of chains user has interacted with"
          >
            <UserBox />
            <UserBox />
          </LeaderBoardBox>
          <LeaderBoardBox
            title="Transactions"
            description="The number of transaction user has made on testnet (Goerli)"
          >
            <UserBox />
            <UserBox />
          </LeaderBoardBox>
          <LeaderBoardBox
            title="Newest address"
            description="The newest address that has actual transaction"
          >
            <UserBox />
            <UserBox />
          </LeaderBoardBox>
        </section>
      </div>
    </div>
  )
}
