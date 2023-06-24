import { ConnectBar } from '@/components/ConnectBar'
import Hero from '@/components/Hero'
import { LeaderBoardBox } from '@/components/LeaderBoardBox'
import MyRanking from '@/components/MyRanking'
import { UserBox } from '@/components/UserBox'
import { Title } from '@/components/shared'
import Head from 'next/head'
import chainSquareConfig from '@/config'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chain Square</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-[10rem] pb-[20rem] px-[2rem]">
        <section className="relative top-0 items-start flex h-[500px]">
          <img className="relative z-[2] mx-auto" src="/logo-mark.svg" alt="logo" />
          <img
            className="absolute left-[50%] translate-x-[-50%] top-0 z-[0] mx-auto"
            src="/img-grid.svg"
            alt="grid"
          />
        </section>

        <section>
          <div className="mt-[2rem] mb-[4rem]">
            <Hero />
          </div>
          <ConnectBar />
          <MyRanking />
          <Title>Leaderboard</Title>
        </section>

        <section className="mt-[2rem] grid grid-cols-1 md:grid-cols-3 justify-between gap-[2rem] md:gap-[8rem]">
          {chainSquareConfig?.criteria.map((criteria, index) => {
            return (
              <div key={index}>
                <LeaderBoardBox title={criteria.title} description={criteria.description}>
                  <UserBox
                    rank="1"
                    value={`{value} ${criteria.label}`}
                    contractAddress={criteria.contract}
                  />
                  <UserBox
                    rank="2"
                    value={`{value} ${criteria.label}`}
                    contractAddress={criteria.contract}
                  />
                  <UserBox
                    rank="3"
                    value={`{value} ${criteria.label}`}
                    contractAddress={criteria.contract}
                  />
                </LeaderBoardBox>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
