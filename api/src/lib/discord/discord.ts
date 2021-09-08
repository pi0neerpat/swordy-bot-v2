import { AuthenticationError } from '@redwoodjs/api'
import { db } from 'src/lib/db'

const API_ENDPOINT = 'https://discord.com/api/v8/'

// https://discord.com/developers/docs/topics/oauth2

const getExpiration = (expiresIn) =>
  new Date(new Date(Date.now() + expiresIn * 1000))

export const getDiscordOauthURL = (state: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.DISCORD_PUBLIC_CLIENT_ID
  }&redirect_uri=${encodeURI(
    process.env.DISCORD_PUBLIC_REDIRECT_URI
  )}&response_type=code&scope=identify%20guilds.join&state=${state}&prompt=none`

export const getDiscordAccessTokenFromCode = async (code: string) => {
  const body = {
    client_id: process.env.DISCORD_PUBLIC_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    redirect_uri: process.env.DISCORD_PUBLIC_REDIRECT_URI,
    grant_type: 'authorization_code',
    scope: 'identify guilds.join',
    code,
  }
  const encodedBody = Object.keys(body)
    .map(
      (key) =>
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

export const refreshDiscordAccessToken = async (refreshToken: string) => {
  const body = {
    client_id: process.env.DISCORD_PUBLIC_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }
  const encodedBody = Object.keys(body)
    .map(
      (key) =>
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
      'User has revoked access to their Discord account. User must start-over by invoking the bot in Discord.'
    )
  const newAccessToken = response?.access_token
  const newRefreshToken = response?.refresh_token
  const newExpiration = getExpiration(response?.expires_in)
  await db.user.update({
    where: { id },
    discordAuth: {
      update: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiration: newExpiration,
      },
    },
  })
  return newAccessToken
}

export const fetchDiscordAccessToken = async (id) => {
  const discordAuth = await db.user.findUnique({ where: { id } }).discordAuth()
  if (!discordAuth)
    throw new AuthenticationError('User has no Discord Oauth data')
  const { refreshToken, accessToken, expiration } = discordAuth
  // TODO: Optimization - first check if current time is past expiration
  const profile = await getDiscordProfile(accessToken)
  if (profile) return accessToken

  // No profile, so token may need refreshing
  const newAccessToken = await refreshDiscordAccessToken(refreshToken)
  return newAccessToken
}

export const getDiscordServerRoles = async (
  accessToken: string,
  serverId: string
): Promise<{
  id: string
  username: string
  avatar: string | null
  discriminator: string
}> => {
  const data = await fetch(`${API_ENDPOINT}/guilds/${serverId}/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
  console.log(accessToken)
  console.log(serverId)
  console.log(data)

  if (!data.roles)
    throw new AuthenticationError(
      'Error fetching guild details from Discord API'
    )
  return data.roles
}

export const getDiscordProfile = async (
  accessToken: string
): Promise<{
  id: string
  username: string
  avatar: string | null
  discriminator: string
}> => {
  const { user } = await fetch(`${API_ENDPOINT}/oauth2/@me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json())
  return user
}

/// Unused
export const addToServer = async (userID: string, accessToken: string) => {
  const body = {
    access_token: accessToken,
  }
  await fetch(
    `${API_ENDPOINT}/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    if (res.status == 201) return res.json()
    else return res.text()
  })
}

export const removeFromServer = async (userID: string) => {
  await fetch(
    `${API_ENDPOINT}/guilds/${
      process.env.DISCORD_SERVER_ID as string
    }/members/${userID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => {
    if (res.status == 201) return res.json()
    else return res.text()
  })
}

export const getRolesForUser = async (userId: string) => {
  return await fetch(
    `${API_ENDPOINT}/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.json())
}

export const setRolesForUser = async (roles: string[], userID: string) => {
  await fetch(
    `${API_ENDPOINT}/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roles }),
    }
  ).then((res) => res.json())
}
export const addRoleForUser = async (roleId: string, userID: string) => {
  const resp = await fetch(
    `${API_ENDPOINT}/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.text())
  console.log(resp)
}
export const removeRoleForUser = async (roleId: string, userID: string) => {
  await fetch(
    `${API_ENDPOINT}/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bot ${process.env.DISCORD_CLIENT_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((res) => res.text())
}

export const RolesToIDs: Record<string, string> = {
  'Ser Dragon of The Round Table': `${process.env.DISCORD_ROLE_SER_DRAGON_OF_THE_ROUND_TABLE}`,
}

export const AdminRoleID = `${process.env.DISCORD_ROLE_ADMIN}`
