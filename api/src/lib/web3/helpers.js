import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'

export const EIP_155_NETWORK_SPEC = [
  { name: 'mainnet', chainId: 1 },
  { name: 'ropsten', chainId: 3 },
  { name: 'rinkeby', chainId: 4 },
  { name: 'goerli', chainId: 5 },
  { name: 'kovan', chainId: 42 },
  { name: 'xdai', chainId: 100 },
  { name: 'matic', chainId: 137 },
  { name: 'mumbai', chainId: 80001 },
  { name: 'bsc-mainnet', chainId: 56 },
  { name: 'bsc-testnet', chainId: 97 },
]

export const getNetworkNameFromId = (chainId) => {
  const network = EIP_155_NETWORK_SPEC.find((item) => item.chainId === chainId)
  if (!network) return { name: 'private', chainId }
  return network
}
export const getIdFromNetworkName = (name) => {
  return EIP_155_NETWORK_SPEC.find((item) => item.name === name.toLowerCase())
    .chainId
}

export const getWalletlessProvider = (chainId) => {
  try {
    if (chainId === 100) {
      return new JsonRpcProvider(process.env.XDAI_RPC_URL)
    }
    if (chainId === 'matic') {
      return new JsonRpcProvider(maticRpcUrl)
    }
    return new InfuraProvider(Number(chainId), process.env.INFURA_ID)
  } catch (error) {
    return getErrorResponse(error, 'getWalletlessProvider')
  }
}
