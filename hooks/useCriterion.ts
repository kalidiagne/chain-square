import { APP_URL } from '@/config'
import { useQuery } from 'react-query'

interface Options {
  userAddress: string
}

export const useChains = ({ userAddress }: Options) => {
  return useQuery(['chainsCriterions', userAddress], async () => {
    const api = `${APP_URL}/api/criterion/chains?userAddress=${userAddress}`
    return (await fetch(api).then((res) => res.json())) as any
  })
}

export const useGetScores = () => {
  return useQuery(['scores'], async () => {
    const api = `${APP_URL}/api/scores`
    return (await fetch(api).then((res) => res.json())) as any
  })
}
