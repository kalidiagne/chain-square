import { PublicLockV13 } from '@unlock-protocol/contracts'
import { useContractRead } from 'wagmi'

interface UserBoxProps {
  rank: string
  value: string
  address: string
  contractAddress: string
}

export const UserBox = ({ rank, value = 'test', contractAddress }: Partial<UserBoxProps>) => {
  const { data, isError, isLoading } = useContractRead({
    address: contractAddress as any,
    abi: PublicLockV13.abi,
    functionName: 'ownerOf',
    chainId: 100,
    args: [rank],
  })

  console.log('data', isError, isLoading)
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
        <span className="text-[1.8rem] break-all">{'data'}</span>
      </div>
    </div>
  )
}
