import { JsonRpcProvider, InfuraProvider } from '@ethersproject/providers'

export const EIP_155_NETWORK_SPEC = [
  { name: 'mainnet', chainId: 1 },
  { name: 'ropsten', chainId: 3 },
  { name: 'rinkeby', chainId: 4 },
  { name: 'goerli', chainId: 5 },
  { name: 'kovan', chainId: 42 },
  // Not provided by Infura
  { name: 'xdai', chainId: 100 },
  { name: 'matic', chainId: 137 },
  { name: 'mumbai', chainId: 80001 },
  { name: 'bsc-mainnet', chainId: 56 },
  { name: 'bsc-testnet', chainId: 97 },
  { name: 'ubiq', chainId: 8 },
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

export const getProviderByChainId = (chainId) => {
  try {
    if (chainId == 100) return new JsonRpcProvider(process.env.XDAI_RPC)
    if (chainId == 137) return new JsonRpcProvider(process.env.MATIC_RPC)
    if (chainId == 80001) return new JsonRpcProvider(process.env.MUMBAI_RPC)
    if (chainId == 56) return new JsonRpcProvider(process.env.BSC_MAINNET_RPC)
    if (chainId == 97) return new JsonRpcProvider(process.env.BSC_TESTNET_RPC)
    if (chainId == 8) return new JsonRpcProvider(process.env.UBIQ_RPC)
    return new InfuraProvider(Number(chainId), process.env.INFURA_ID)
  } catch (error) {
    throw new Error(error)
  }
}
