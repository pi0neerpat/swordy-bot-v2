import lockAbi from './unlockAbi'

const CONTRACTS = {
  lock: {
    network: {
      rinkeby: {
        address: '0x2bc1cf6a2beb499d33f0c5e52363e49fb94e2e9a',
        chainId: 4,
      },
      homestead: {
        address: '0x151bA2D66f1ff5AD28B1Cf746A2a359321c979C3',
        chainId: 1,
      },
    },
    abi: lockAbi,
  },
  chiev: {
    network: {
      xdai: {
        address: "0xe0D25a9eAcCc946a016cD046EC1e5Cdf413Aa110",
        chainId: 100
      }
    }
  }
}
export default CONTRACTS
