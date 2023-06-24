import { useQuery } from 'react-query'

interface Options {
  userAddress: string
}

export const useChains = ({ userAddress }: Options) => {
  return useQuery(['chainsCriterions', userAddress], async () => {
    const api = `/api/criterion/chains&userAddress=${userAddress}`
    return (await fetch(api).then((res) => res.json())) as any
  })
}
