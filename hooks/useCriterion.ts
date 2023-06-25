import { useQuery } from 'react-query'

interface Options {
  userAddress: string
}

export const useChains = ({ userAddress }: Options) => {
  return useQuery(['chainsCriterions', userAddress], async () => {
    const api = `/api/criterion/chains?userAddress=${userAddress}`
    return (await fetch(api).then((res) => res.json())) as any
  })
}

export const useGetScores = ({ criteria }: any) => {
  return useQuery(
    ['scores', criteria],
    async () => {
      const api = `/api/scores?criterion=${criteria}`
      return (await fetch(api).then((res) => res.json())) as any
    },
    {
      enabled: !!criteria,
    }
  )
}
