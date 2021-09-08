export const ADD_BOT_LINK = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_PUBLIC_CLIENT_ID}&scope=bot%20guilds&permissions=8`
export const DISCORD_INVITE = 'https://discord.gg/Nw3y4GtBSh'
export const availableNetworks = [
  'mainnet',
  'xdai',
  'matic',
  'goerli',
  'ropsten',
  'rinkeby',
  'kovan',
  'mumbai',
  'bsc-mainnet',
  'bsc-testnet',
]
export const availableTokenTypes = [
  { value: 'erc721', text: 'ERC721' },
  { value: 'unlock', text: 'Unlock Protocol' },
  // { value: 'erc20', text: 'ERC20' },
  // { value: 'loot', text: 'Loot' },
]
