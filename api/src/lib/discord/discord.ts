// https://discord.com/developers/docs/topics/oauth2
export const getDiscordOauthURL = (state: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    process.env.DISCORD_PUBLIC_CLIENT_ID
  }&redirect_uri=${encodeURI(
    process.env.DISCORD_PUBLIC_REDIRECT_URI
  )}&response_type=code&scope=identify%20guilds.join&state=${state}&prompt=none`

export const getDiscordAccessToken = async (code: string) => {
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
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'post',
    body: encodedBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  }).then((res) => res.json())
  return (response?.access_token as string) || null
}

export const getDiscordProfile = async (
  accessToken: string
): Promise<{
  id: string
  username: string
  avatar: string | null
  discriminator: string
}> => {
  const { user } = await fetch('https://discord.com/api/oauth2/@me', {
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
    `https://discord.com/api/v8/guilds/${
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
    `https://discord.com/api/v8/guilds/${
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
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userId}`,
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
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}`,
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
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
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
    `https://discord.com/api/v8/guilds/${process.env.DISCORD_SERVER_ID}/members/${userID}/roles/${roleId}`,
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
