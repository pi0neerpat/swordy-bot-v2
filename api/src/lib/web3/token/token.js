import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'
import { TOKEN_TYPES } from 'src/lib/role/constants'

import { getProviderByChainId } from 'src/lib/web3/helpers'

import erc721Abi from './erc721Abi'
import erc20Abi from './erc20Abi'

export const checkTokenBalance = async ({
  userAddress,
  chainId,
  contractAddress,
  type,
  balance,
}) => {
  let tokenId = null // Specific NFTs are not implemented yet
  let userBalance = parseUnits('0', 18)
  const rpcProvider = getProviderByChainId(chainId)
  if (type === TOKEN_TYPES.ERC20) {
    userBalance = await getErc20Balance({
      contractAddress,
      rpcProvider,
      userAddress,
    })
    return userBalance.gte(parseUnits('1', 18))
  }
  if (type === TOKEN_TYPES.ERC721) {
    userBalance = await getErc721Balance({
      contractAddress,
      rpcProvider,
      tokenId,
      userAddress,
    })
    return userBalance.gte(parseUnits('1', 0))
  }
}

const getErc721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, erc721Abi, rpcProvider)
  return await contract.balanceOf(userAddress)
}

const getErc20Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, erc20Abi, rpcProvider)
  return await contract.balanceOf(userAddress)
}
