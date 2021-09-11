import fetch from 'node-fetch'
import { Contract } from '@ethersproject/contracts'
import { getProviderByChainId } from 'src/lib/web3/helpers'
import unlockAbi from './unlockAbi'
import { getUnlockMessage } from 'src/services/ethereumAuth'
const PAYWALL_BASE_URL = 'https://app.unlock-protocol.com/checkout'

export const getUnlockPaywallUrl = ({
  tokens,
  roleName,
  userId,
  oauthState,
  guild,
}) => {
  let locks = {}
  tokens.map((token) => {
    locks[token.contractAddress] = {
      network: Number(token.chainId),
      // name: `Access role - ${roleName}`,
    }
  })
  const paywallConfig = {
    locks,
    icon: guild.iconUrl,
    callToAction: {
      default: `Join the ${guild.name} community on Discord!`,
    },
    referrer: process.env.UNLOCK_REFERRER_ADDRESS,
    pessimistic: true,
    messageToSign: getUnlockMessage(oauthState, userId),
  }
  console.log(paywallConfig)
  console.log(encodeURIComponent(JSON.stringify(paywallConfig)))
  const url = `${PAYWALL_BASE_URL}?redirectUri=${encodeURIComponent(
    process.env.PUBLIC_REDIRECT_URL + '/unlock'
  )}&paywallConfig=${encodeURIComponent(JSON.stringify(paywallConfig))}`
  console.log(url)
  return url
}

const getLockContract = ({ contractAddress, chainId }) => {
  return new Contract(contractAddress, unlockAbi, getProviderByChainId(chainId))
}

export const checkUnlockBalance = async ({
  contractAddress,
  chainId,
  userAddress,
}) => {
  try {
    const lockContract = getLockContract({ contractAddress, chainId })
    const hasValidKey = await lockContract.getHasValidKey(userAddress)
    return hasValidKey
  } catch (e) {
    console.log(e)
    throw new Error('checkUnlockBalance() trouble checking web3 balance')
  }
}
