import { useQuery } from 'react-query'

interface Options {
  userAddress: string
  criterion: string
}

export const useRanking = ({ userAddress, criterion }: Options) => {
  return useQuery(
    [criterion, userAddress],
    async () => {
      const api = `/api/criterion/${criterion}?userAddress=${userAddress}`
      return fetch(api).then((res) => res.json())
    },
    {
      enabled: !!criterion && !!userAddress,
    }
  )
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
