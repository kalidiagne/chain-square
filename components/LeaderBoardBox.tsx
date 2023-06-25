import React, { ReactNode } from 'react'
import TotalBox from './TotalBox'
import { useGetScores } from '@/hooks/useCriterion'
import Blockies from 'react-blockies'

interface LeaderBoardBoxProps {
  title: string
  description: string
  total?: number | number
  children?: ReactNode
  criteria: string
  label: string
}

export const LeaderBoardBox = ({ title, description, criteria, label }: LeaderBoardBoxProps) => {
  const { data } = useGetScores({ criteria })

  if (!data) return null

  return (
    <div className="border border-[#736A67] p-[2.4rem] rounded-[0.8rem]">
      <div className="flex flex-col gap-[8px] text-center">
        <span className="font-bold text-[2.8rem] text-[#14EDCD]">{title}</span>
        <span className="text-[#8E8482] text-[1.8rem]">{description}</span>
      </div>
      <div className="mt-[1.6rem]">
        <TotalBox value={data.total} />
      </div>
      <div className="mt-[3.2rem] grid gap-[2.4rem]">
        {data.top?.map((res: any, index: number) => {
          const rank = index + 1
          const userAddress = res.userAddress
          return (
            <div
              key={index}
              className="flex flex-col gap-[2.8rem] p-[2.4rem] bg-[#3F3B3A] rounded-[0.8rem]"
            >
              <div className="flex items-center">
                <span className="font-bold text-[#FFF8E7] text-[3.2rem]">{`#${rank}`}</span>
                <span className="font-bold text-[#FFF8E7] text-[3.2rem] ml-auto">
                  {res.score} {label}
                </span>
              </div>
              <div className="grid grid-cols-[48px_1fr] gap-[1rem]">
                <Blockies
                  className="w-[4.8rem] h-[4.8rem] rounded-full bg-gray-200 block object-cover"
                  size={12}
                  seed={userAddress}
                />
                {userAddress && <span className="text-[1.8rem] break-all">{userAddress}</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
