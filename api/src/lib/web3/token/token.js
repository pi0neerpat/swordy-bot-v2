import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'

import { getProviderByChainId } from 'src/lib/web3/helpers'
import { isLockValid } from 'src/lib/web3/unlock'

import erc721Abi from './erc721Abi'
import erc20Abi from './erc20Abi'

export const checkTokenBalance = async ({ token, balance, userAddress }) => {
  const { contractAddress, chainId, tokenId, type } = token
  let userBalance = parseUnits('0', 18)
  const rpcProvider = getProviderByChainId(chainId)
  if (type === 'erc20')
    userBalance = await getErc20Balance({
      contractAddress,
      rpcProvider,
      userAddress,
    })
  if (type === 'erc721')
    userBalance = await getErc721Balance({
      contractAddress,
      rpcProvider,
      tokenId,
      userAddress,
    })
  if (type === 'unlock')
    return await isLockValid({ contractAddress, chainId, userAddress })
  return userBalance.gte(parseUnits(balance.toString(), 18))
}

const getErc721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
  tokenId,
}) => {
  const contract = new Contract(contractAddress, erc721Abi, rpcProvider)
  const balance = await contract.balanceOf(userAddress, tokenId)
}

const getErc20Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, erc20Abi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
