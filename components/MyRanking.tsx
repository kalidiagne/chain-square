import React, { ReactNode } from 'react'
import { Title } from './shared'
import { classed } from '@tw-classed/react'
import LeaderBoxCard from './LeaderBoxCard'
import chainSquareConfig from '@/config'
import { useGetScores, useRanking } from '@/hooks/useCriterion'
import { useAccount } from 'wagmi'
interface RankBoxProps {
  rank?: string
  value?: ReactNode
  isFirst?: boolean
  unit: string
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
const RankBox = ({ rank = '', value, isFirst, unit }: RankBoxProps) => {
  return (
    <RankBoxWrapper isFirst={isFirst}>
      <span className="font-bold text-[#FFF8E7] text-[3.2rem]">{`#${rank ?? ''}`}</span>
      <span className="font-bold text-[#FFF8E7] text-[3.2rem]">
        {value} {unit}
      </span>
    </RankBoxWrapper>
  )
}

const isMatch = (address1: string, address2: any = '') => {
  return address1?.toLowerCase() === address2?.toLowerCase()
}

export default function MyRanking() {
  const { isConnected } = useAccount()
  if (!isConnected) return null

  return (
    <div>
      <Title>My rankings</Title>
      <div className="grid gap-4 md:gap-[4rem] grid-cols-1 md:grid-cols-3">
        {Object.keys(chainSquareConfig?.criteria).map((criterium: string) => {
          return (
            <div key={criterium}>
              {/* @ts-expect-error */}
              <CriteriaRank criterium={chainSquareConfig?.criteria[criterium]} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function CriteriaRank({ criterium }: { criterium: any }) {
  const { address, isConnected } = useAccount()
  const { data: scores } = useGetScores({ criteria: criterium.name })
  const { data: ranking, isLoading } = useRanking({
    criterion: criterium.name,
    userAddress: address,
  })

  if (!isConnected) return null

  const isLeader = isMatch(scores?.[0]?.userAddress, address)
  return (
    <LeaderBoxCard title={criterium.title} description={criterium.description} total={scores.total}>
      {isLoading && <span>...Loading...</span>}
      {!isLoading && ranking && (
        <RankBox
          unit={criterium.unit}
          rank={ranking.rank}
          value={ranking.score}
          isFirst={ranking.rank === 1}
        />
      )}
    </LeaderBoxCard>
  )
}
