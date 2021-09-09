import fetch from 'node-fetch'
import { Contract } from '@ethersproject/contracts'
import CONTRACTS from './contracts'
import { getProviderByChainId } from 'src/lib/web3/helpers'

const getLockContract = ({ contractAddress, chainId }) => {
  return new Contract(
    contractAddress,
    CONTRACTS.lock.abi,
    getProviderByChainId(chainId)
  )
}

export const isLockValid = async ({
  contractAddress,
  chainId,
  userAddress,
}) => {
  const lockContract = getLockContract({ contractAddress, chainId })
  const hasValidKey = await lockContract.getHasValidKey(userAddress)
  return hasValidKey
}
