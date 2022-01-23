import { Contract } from '@ethersproject/contracts'
import { parseUnits } from '@ethersproject/units'
import { TOKEN_TYPES } from 'src/lib/role/constants'

import { getProviderByChainId } from 'src/lib/web3/helpers'

import erc20Abi from './erc20Abi'
import erc1155Abi from './erc1155Abi'

export const checkTokenBalance = async ({
  userAddress,
  chainId,
  contractAddress,
  type,
  tokenId,
  _balance,
}) => {
  try {
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
        userAddress,
      })
    }
    if (type === TOKEN_TYPES.ERC1155) {
      userBalance = await getErc1155Balance({
        contractAddress,
        rpcProvider,
        userAddress,
        tokenId,
      })
      // Unused since type is required
      return userBalance.gte(parseUnits('1', 0))
    }
  } catch (e) {
    throw new Error(
      `checkTokenBalance() trouble checking web3 balance: ${e.code}`
    )
  }
}

const getErc721Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
}) => {
  const contract = new Contract(contractAddress, erc20Abi, rpcProvider)
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

const getErc1155Balance = async ({
  contractAddress,
  rpcProvider,
  userAddress,
  tokenId,
}) => {
  const contract = new Contract(contractAddress, erc1155Abi, rpcProvider)
  return await contract.balanceOf(userAddress, tokenId)
}
