import React from 'react'

interface LeaderBoardBoxProps {
  title: string
  description: string
}
export default function LeaderBoardBox({ title, description }: LeaderBoardBoxProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      <span className="font-bold text-[2.8rem] text-[#14EDCD]">{title}</span>
      <span className="text-[#FFF8E7] text-[1.8rem]">{description}</span>
    </div>
  )
}
