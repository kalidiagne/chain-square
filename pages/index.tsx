import LeaderBoardBox from '@/components/LeaderboardBox'
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chain Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="relative top-0 flex justify-center">
        <img src="/logo-mark.svg" alt="logo" />
      </section>

      <section>
        <h1 className="font-luckiest text-[3rem] md:text-[6.4rem] tracking-[2.5rem] text-[#FF7043] text-center">
          Leaderboard
        </h1>
      </section>

      <section className="flex justify-between gap-[10rem]">
        <LeaderBoardBox
          title="Chains"
          description="The number of chains user has interacted with"
        />
        <LeaderBoardBox
          title="Transactions"
          description="The number of transaction user has made on testnet (Goerli)"
        />
        <LeaderBoardBox
          title="Newest address"
          description="The newest address that has actual transaction"
        />
      </section>
    </div>
  )
}
