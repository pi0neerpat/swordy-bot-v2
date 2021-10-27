import { bufferToHex } from 'ethereumjs-util'
import { recoverPersonalSignature } from 'eth-sig-util'
import jwt from 'jsonwebtoken'

import { db } from 'src/lib/db'

const NONCE_MESSAGE =
  'Please prove you control this wallet by signing this text: '

export const getNonceMessage = (nonce, options) => {
  let optionsText = ''
  if (options)
    optionsText =
      '&' +
      Object.keys(options)
        .map(
          (key) =>
            encodeURIComponent(key) + '=' + encodeURIComponent(options[key])
        )
        .join('&')
  return NONCE_MESSAGE + 'salt=' + nonce + optionsText
}

export const authChallenge = async ({
  input: { address: addressRaw, options },
}) => {
  const nonce = Math.floor(Math.random() * 1000000).toString()
  const address = addressRaw.toLowerCase()

  // Modified from the default service for @oneclickdapp/ethereum-auth service
  await db.user.upsert({
    where: { ...(options.id ? { id: options.id } : { address }) },
    update: {
      address,
      authDetail: {
        upsert: {
          create: {
            nonce,
            timestamp: new Date(),
          },
          update: {
            nonce,
            timestamp: new Date(),
          },
        },
      },
    },
    create: {
      id: options.id,
      address,
      authDetail: {
        create: {
          nonce,
          timestamp: new Date(),
        },
      },
    },
  })

  return { message: getNonceMessage(nonce, options.state && options) }
}

export const authVerify = async ({
  input: { signature, address: addressRaw, options },
}) => {
  try {
    const address = addressRaw.toLowerCase()
    const user = await db.user.findUnique({
      where: { ...(options.id ? { id: options.id } : { address }) },
    })
    if (!user) throw new Error('No authentication started')
    const { nonce, timestamp } = await db.user
      .findUnique({
        where: { address },
      })
      .authDetail()

    const startTime = new Date(timestamp)
    if (new Date() - startTime > 5 * 60 * 1000)
      throw new Error(
        'The challenge must have been generated within the last 5 minutes'
      )

    // Modified from the default service for @oneclickdapp/ethereum-auth service
    // Verifies that the flow uses the same user id
    let optionsFromDatabase = null
    if (options.state)
      optionsFromDatabase = {
        state: user.oauthState,
        id: user.id,
      }
    const signerAddress = recoverPersonalSignature({
      data: bufferToHex(
        Buffer.from(getNonceMessage(nonce, optionsFromDatabase), 'utf8')
      ),
      sig: signature,
    })
    if (address !== signerAddress.toLowerCase())
      throw new Error('invalid signature')

    const token = jwt.sign(
      { address, id: user.id },
      process.env.ETHEREUM_JWT_SECRET,
      {
        expiresIn: '5h',
      }
    )
    return { token }
  } catch (e) {
    throw new Error(e)
  }
}
