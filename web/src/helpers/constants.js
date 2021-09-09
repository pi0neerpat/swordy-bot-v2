export const ADD_BOT_LINK = `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_PUBLIC_CLIENT_ID}&scope=bot%20guilds&permissions=8`
export const DISCORD_INVITE = 'https://discord.gg/Nw3y4GtBSh'

export const EIP_155_NETWORK_SPEC = [
  { name: 'mainnet', chainId: 1 },
  { name: 'ropsten', chainId: 3 },
  { name: 'rinkeby', chainId: 4 },
  { name: 'goerli', chainId: 5 },
  { name: 'kovan', chainId: 42 },
  { name: 'xdai', chainId: 100 },
  { name: 'matic', chainId: 137 },
  { name: 'mumbai', chainId: 80001 },
  { name: 'bsc-mainnet', chainId: 56 },
  { name: 'bsc-testnet', chainId: 97 },
]

export const TOKEN_TYPES = [
  { value: 'erc721', text: 'ERC721' },
  { value: 'unlock', text: 'Unlock Protocol' },
  // { value: 'erc20', text: 'ERC20' },
  // { value: 'loot', text: 'Loot' },
]
