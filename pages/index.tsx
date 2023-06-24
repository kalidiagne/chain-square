import { ConnectBar } from '@/components/ConnectBar'
import Hero from '@/components/Hero'
import { LeaderBoardBox } from '@/components/LeaderBoardBox'
import MyRanking from '@/components/MyRanking'
import { Title } from '@/components/shared'
import Head from 'next/head'
import chainSquareConfig from '@/config'
import { useAccount } from 'wagmi'

export default function Home() {
  const { isConnected } = useAccount()

  return (
    <div>
      <Head>
        <title>Chain Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-[10rem] pb-[20rem] px-[2rem]">
        <section className={`relative top-0 items-start flex ${!isConnected ? 'h-[500px]' : ''}`}>
          <img className="relative z-[2] mx-auto" src="/logo-mark.svg" alt="logo" />
          {!isConnected && (
            <img
              className="absolute left-[50%] translate-x-[-50%] top-0 z-[0] mx-auto"
              src="/img-grid.svg"
              alt="grid"
            />
          )}
        </section>

        <section>
          {!isConnected && (
            <div className="mt-[2rem] mb-[4rem]">
              <Hero />
            </div>
          )}
          <ConnectBar />
          <MyRanking />
          <Title>Leaderboard</Title>
        </section>

        <section className="mt-[2rem] grid grid-cols-1 md:grid-cols-3 justify-between gap-[2rem] md:gap-[8rem]">
          {Object.keys(chainSquareConfig?.criteria).map((criterium: string) => {
            // @ts-expect-error
            const criteria = chainSquareConfig?.criteria[criterium]
            return (
              <div key={criterium}>
                <LeaderBoardBox
                  criteria={criteria.name}
                  title={criteria.title}
                  description={criteria.description}
                  label={criteria.label}
                />
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
