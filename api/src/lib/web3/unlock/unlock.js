import fetch from 'node-fetch'
import { Contract } from '@ethersproject/contracts'
import { getProviderByChainId } from 'src/lib/web3/helpers'
import unlockAbi from './unlockAbi'

const getLockContract = ({ contractAddress, chainId }) => {
  return new Contract(contractAddress, unlockAbi, getProviderByChainId(chainId))
}

export const checkUnlockBalance = async ({
  contractAddress,
  chainId,
  userAddress,
}) => {
  const lockContract = getLockContract({ contractAddress, chainId })
  const hasValidKey = await lockContract.getHasValidKey(userAddress)
  return hasValidKey
}
