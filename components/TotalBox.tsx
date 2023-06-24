import React from 'react'

interface TotalBoxProps {
  title?: string
  value: string | number
}

export default function TotalBox({ title = 'Total participants:', value }: TotalBoxProps) {
  return (
    <div className="flex flex-col border border-[#736A67] gap-[0.8rem] rounded-[0.8rem] text-center p-[0.8rem]">
      <span className="text-[1.8rem]">{title}</span>
      <span className="text-[1.8rem] font-bold">{value}</span>
    </div>
  )
}
