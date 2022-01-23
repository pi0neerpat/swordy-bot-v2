import { AuthenticationError } from '@redwoodjs/graphql-server'
import { EnvelopError } from '@envelop/core'
import fetch from 'cross-fetch'

import { db } from 'src/lib/db'
const API_ENDPOINT = 'https://discord.com/api/v9'
const SCOPES = 'identify guilds'
// https://discord.com/developers/docs/topics/oauth2

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

export const getDiscordOauthURL = (state: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.DISCORD_PUBLIC_CLIENT_ID
  }&redirect_uri=${encodeURI(
    process.env.APP_DOMAIN
  )}/redirect/discord&response_type=code&scope=${encodeURI(
    SCOPES
  )}&state=${state}&prompt=none`

export const getDiscordAccessTokenFromCode = async (code: string) => {
  const body = {
    client_id: process.env.DISCORD_PUBLIC_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: `${process.env.APP_DOMAIN}/redirect/discord`,
    grant_type: 'authorization_code',
    scope: SCOPES,
    code,
  }
  const encodedBody = Object.keys(body)
    .map(
      (key) =>
        /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
        encodeURIComponent(key) + '=' + encodeURIComponent((body as any)[key])
    )
    .join('&')
  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'post',
    body: encodedBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((res) => res.json())
  return {
    accessToken: response?.access_token,
    refreshToken: response?.refresh_token,
    expiration: getExpiration(response?.expires_in),
  }
}

export const getDiscordServerRoles = async (serverId: string) => {
  const roles = await fetch(`${API_ENDPOINT}/guilds/${serverId}/roles`, {
    headers: {
      method: 'GET',
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())

  if (!roles || roles.error)
    throw new AuthenticationError(
      `Can't access details for server #${serverId}. Swordy bot may have been removed.`
    )
  return roles?.filter(
    (role) => role.name !== '@everyone' && !role.name.includes('swordy-bot-v2')
  )
}

export const getDiscordInviteUrl = async (serverId: string) => {
  const data = await fetch(`${API_ENDPOINT}/guilds/${serverId}/invites`, {
    headers: {
      method: 'GET',
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  // NOTE: Its possible that there are no invite links for a server!
  if (!data || !data.length)
    throw new AuthenticationError(
      `Can't access details for server #${serverId}. Swordy bot may have been removed.`
    )
  const { code } = data[0]
  return `https://discord.com/invite/${code}`
}

export const getDiscordServerOwner = async (serverId: string) => {
  const server = await fetch(`${API_ENDPOINT}/guilds/${serverId}`, {
    headers: {
      method: 'GET',
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
  return server.owner_id
}

export const getDiscordProfile = async (accessToken: string) => {
  const response = await fetch(`${API_ENDPOINT}/oauth2/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
  return response.user
}

export const verifyDiscordServerManager = async (serverId, userId) => {
  const serverOwner = await getDiscordServerOwner(serverId)
  if (serverOwner === userId) return true
  const roles = await getDiscordUserRoles(serverId, userId)
  let isRoleManager = false
  roles.map((role) => {
    // https://discord.com/developers/docs/topics/permissions
    if (
      (role.permissions & 0x0010000000) > 0 || // manage roles
      (role.permissions & 0x0000000008) > 0 // administrator
    ) {
      isRoleManager = true
    }
  })
  return isRoleManager
}

export const getDiscordUserRoles = async (serverId, userId) => {
  const serverRoles = await getDiscordServerRoles(serverId)
  const member = await fetch(
    `${API_ENDPOINT}/guilds/${serverId}/members/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json())
  return serverRoles.filter((role) => member.roles.includes(role.id))
}

export const addRoleForUser = async (
  serverId: string,
  roleId: string,
  userId: string
) => {
  const response = await fetch(
    `${API_ENDPOINT}/guilds/${serverId}/members/${userId}/roles/${roleId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.text())
  if (response.includes('50013'))
    throw new EnvelopError(
      'The swordy-bot role is not high enough to manage this role. SERVER SETTINGS > ROLES > drag "swordy-bot-v2" role above all the roles you want to manage. Video guide: https://youtu.be/JeM8oJE94zg?t=71'
    )
}

export const removeRoleForUser = async (
  serverId: string,
  roleId: string,
  userId: string
) => {
  await fetch(
    `${API_ENDPOINT}/guilds/${serverId}/members/${userId}/roles/${roleId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.text())
}

export const deleteMessage = async (channelId: string, messageId: string) => {
  await fetch(`${API_ENDPOINT}/channels/${channelId}/messages/${messageId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.text())
}

// Unused

export const refreshDiscordAccessToken = async (
  refreshToken: string,
  id: string
) => {
  const body = {
    client_id: process.env.DISCORD_PUBLIC_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  const encodedBody = Object.keys(body)
    .map(
      (key) =>
        /*eslint-disable-next-line @typescript-eslint/no-explicit-any */
        encodeURIComponent(key) + '=' + encodeURIComponent((body as any)[key])
    )
    .join('&')
  const response = await fetch(`${API_ENDPOINT}/oauth2/token`, {
    method: 'post',
    body: encodedBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((res) => res.json())
  if (!response.access_token)
    throw new AuthenticationError(
      "You've revoked Swordy Bot from accessing your Discord account. Please start-over in Discord."
    )
  const newAccessToken = response?.access_token
  const newRefreshToken = response?.refresh_token
  const newExpiration = getExpiration(response?.expires_in)
  await db.user.update({
    where: { id },
    data: {
      discordAuth: {
        update: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          expiration: newExpiration,
        },
      },
    },
  })
  return newAccessToken
}

export const fetchDiscordAccessToken = async (id) => {
  const discordAuth = await db.user.findUnique({ where: { id } }).discordAuth()
  if (!discordAuth)
    throw new AuthenticationError('User has no Discord Oauth data')
  const { refreshToken, accessToken } = discordAuth
  // TODO: Optimization - first check if current time is past expiration
  const profile = await getDiscordProfile(accessToken)
  if (profile) return accessToken

  // No profile, so token may need refreshing
  const newAccessToken = await refreshDiscordAccessToken(refreshToken, id)
  return newAccessToken
}
