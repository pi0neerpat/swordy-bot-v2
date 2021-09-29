import { Contract } from '@ethersproject/contracts'
import { getProviderByChainId } from 'src/lib/web3/helpers'
import unlockAbi from './unlockAbi'
const PAYWALL_BASE_URL = 'https://app.unlock-protocol.com/checkout'

const NONCE_MESSAGE =
  'Please prove you control this wallet by signing this text: '

export const getUnlockMessage = (oauthState, userId) =>
  NONCE_MESSAGE + 'state=' + oauthState + '&id=' + userId

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
  const messageToSign = getUnlockMessage(oauthState, userId)
  const paywallConfig = {
    locks,
    icon: guild.iconUrl,
    callToAction: {
      default: `Join the ${
        guild.name
      } community on Discord by unlocking the role: "${roleName}". ${
        tokens.length > 1 ? ' You only need to purchase one of these.' : ''
      }`,
    },
    referrer: process.env.UNLOCK_REFERRER_ADDRESS,
    pessimistic: true,
    messageToSign,
  }
  const url = `${PAYWALL_BASE_URL}?redirectUri=${encodeURIComponent(
    process.env.PUBLIC_REDIRECT_URL + '/unlock' + '?id=' + userId
  )}&paywallConfig=${encodeURIComponent(JSON.stringify(paywallConfig))}`
  return url
}

const getLockContract = ({ contractAddress, chainId }) => {
  try {
    return new Contract(
      contractAddress,
      unlockAbi,
      getProviderByChainId(chainId)
    )
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
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
    console.log('checkUnlockBalance' + e)
    throw new Error('checkUnlockBalance() trouble checking web3 balance')
  }
}
