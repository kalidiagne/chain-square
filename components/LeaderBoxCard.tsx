import React from 'react'
import TotalBox from './TotalBox'

export default function LeaderBoxCard({ title, description, total = 0, children }: any) {
  return (
    <div className="border border-[#736A67] p-[2.4rem] rounded-[0.8rem]">
      <div className="flex flex-col gap-[8px] text-center">
        <span className="font-bold text-[2.8rem] text-[#14EDCD]">{title}</span>
        <span className="text-[#8E8482] text-[1.8rem]">{description}</span>
      </div>
      <div className="mt-[1.6rem]">
        <TotalBox value={total} />
      </div>
      <div className="mt-[3.2rem] grid gap-[2.4rem]">{children}</div>
    </div>
  )
}
