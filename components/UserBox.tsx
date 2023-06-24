interface UserBoxProps {
  rank: string
  value: string
  address: string
}

export const UserBox = ({
  rank = '1',
  value = 'test',
  address = '0xF3850C690BFF6c1E343D2449bBbbb00b0E934f7b',
}: Partial<UserBoxProps>) => {
  return (
    <div className="flex flex-col gap-[2.8rem] p-[2.4rem] bg-[#3F3B3A] rounded-[0.8rem]">
      <div className="flex items-center">
        <span className="font-bold text-[#FFF8E7] text-[3.2rem]">{`#${rank}`}</span>
        <span className="font-bold text-[#FFF8E7] text-[3.2rem] ml-auto">{value}</span>
      </div>
      <div className="grid grid-cols-[48px_1fr] gap-[1rem]">
        <div className="w-[4.8rem] h-[4.8rem] rounded-full bg-gray-200 block object-cover">
          <img src="" alt="" />
        </div>
        <span className="text-[1.8rem] break-all">{address}</span>
      </div>
    </div>
  )
}
