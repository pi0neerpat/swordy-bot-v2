import { EIP_155_NETWORK_SPEC } from 'src/helpers/constants'

export const truncate = (text, length = 50) => {
  if (typeof text !== 'string') return ''
  return text.substring(0, length) + (text.length > length ? '...' : '')
}

export const trimAddress = (address) => {
  if (typeof address !== 'string') return ''
  return address.substring(0, 5) + '...' + address.substring(38, 42)
}

export const getNetworkNameFromId = (chainId) => {
  const network = EIP_155_NETWORK_SPEC.find((item) => item.chainId == chainId)
  if (!network) return chainId
  return network.name
}
