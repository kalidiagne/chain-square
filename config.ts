export const APP_URL = 'https://chain-square.vercel.app'

export default {
  contract: '0x06d81eb3989a2a1f4e359f989efa5ddb47b880cc',
  criteria: {
    chains: {
      title: 'Chains',
      description: 'The number of chains user has interacted with',
      label: 'Chains',
      name: 'chains',
      contract: '0x4227bbaa809d4295c6fc3050ff69945b1202ca1c',
    },
    n00b: {
      title: 'Newest address',
      description: 'The newest address that has actual transaction',
      label: '',
      name: 'n00b',
      contract: '0xc8b3b3b9d39ea086d68d21b6ba01a01a06b3ad6d',
    },
    'test-transactions': {
      title: 'Transactions',
      description: 'The number of transaction user has made on testnet (Goerli)',
      label: 'TX',
      name: 'test-transactions',
      contract: '0xb559bee539cf7253ce5ff92252879b3e622f3def',
    },
  },
}
