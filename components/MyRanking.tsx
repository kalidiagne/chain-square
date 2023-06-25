import React, { ReactNode } from 'react'
import { Title } from './shared'
import { classed } from '@tw-classed/react'
import LeaderBoxCard from './LeaderBoxCard'
import { useGetScores } from '@/hooks/useCriterion'
import { useAccount } from 'wagmi'
interface RankBoxProps {
  rank?: string
  value?: ReactNode
  isFirst?: boolean
}

const RankBoxWrapper = classed.div(
  'flex flex-col gap-[2.8rem] p-[2.4rem] bg-[#3F3B3A] rounded-[0.8rem] duration-200 transition-all',
  {
    variants: {
      isFirst: {
        true: 'border border-[4px] border-[#3FF625]',
        false: 'border border-[4px] border-transparent',
      },
    },
  }
)
const RankBox = ({ rank = '', value, isFirst = false }: RankBoxProps) => {
  return (
    <RankBoxWrapper isFirst={isFirst}>
      <span className="font-bold text-[#FFF8E7] text-[3.2rem]">{`#${rank ?? ''}`}</span>
      <span className="font-bold text-[#FFF8E7] text-[3.2rem]">{value}</span>
      {isFirst && (
        <div className="cursor-pointer flex items-center text-[1.4rem] hover:underline duration-200 transition-all text-[#FFF8E7]">
          <span>See your medal on Opensea</span>
          <div className="ml-auto">
            <img className="h-[1.8rem]" src="/arrow-external.svg" alt="" />
          </div>
        </div>
      )}
    </RankBoxWrapper>
  )
}

const isMatch = (address1: string, address2: any = '') => {
  return address1?.toLowerCase() === address2?.toLowerCase()
}
export default function MyRanking() {
  const { data: chainsScores } = useGetScores({ criteria: 'chains' })
  const { data: noobs } = useGetScores({ criteria: 'n00b' })
  const { data: testTransactions } = useGetScores({ criteria: 'test-transactions' })
  const { address, isConnected } = useAccount()

  const isLeaderBoardOnChains = isMatch(chainsScores?.[0]?.userAddress, address)
  const isLeaderNoobs = isMatch(noobs?.[0]?.userAddress, address)
  const isLeaderTestTransactions = isMatch(testTransactions?.[0]?.userAddress, address)

  if (!isConnected) return null

  return (
    <div>
      <Title>My rankings</Title>
      <div className="grid gap-4 md:gap-[4rem] grid-cols-1 md:grid-cols-3">
        <LeaderBoxCard title="Chains" description="The number of chains user has interacted with">
          <RankBox isFirst={isLeaderBoardOnChains} />
        </LeaderBoxCard>
        <LeaderBoxCard
          title="Transactions"
          description="The number of transaction user has made on testnet (Goerli)"
        >
          <RankBox isFirst={isLeaderTestTransactions} />
        </LeaderBoxCard>
        <LeaderBoxCard
          title="Newest address"
          description="The newest address that has actual transaction"
        >
          <RankBox isFirst={isLeaderNoobs} />
        </LeaderBoxCard>
      </div>
    </div>
  )
}
