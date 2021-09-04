## What is Nifty Chess

Nifty Chess is an app that lets you save, collect, trade, and marvel at unique games of chess by saving them as ownable NFTs. Each token represents a completely unique game, no two can represent the same sequence of moves, and its other attributes are a reflection of those particular moves.

## What are NFTs?

Non-fungible tokens (NFTs) are unique, digital items with blockchain-managed ownership. Check out the [NFT Bible](https://opensea.io/blog/guides/non-fungible-tokens/) for a very deep dive on them.

## How do I mint a new token on Nifty Chess?

To mint a new game you'll just need to paste a link to a lichess game at https://niftychess.com/games/new, and sign a transaction with your Ethereum wallet on the xDAI network. Then a unique token will instantly be minted for you, which only you own.

To mint a new NFT on Nifty Chess you will need an Ethereum wallet connected to the xDAI chain, and some xDAI tokens.

### What is a Wallet and where do I get one?

A wallet is an access point to a blockchain. In the case of Nifty Chess, we like the Ethereum blockchain so you will need a wallet that works with that. We suggest the browser extension and mobile app [MetaMask](https://metamask.io/), [here's a great video](https://youtu.be/6Gf_kRE4MJU?t=6) on it.

### What is xDAI and where do I get some?

xDAI-Chain is a blockchain built on a layer above Ethereum (Layer 2, or L2), which we use to make our app fast and cheap to use. The native currency of the xDAI chain is xDAI, which is pegged to $1, so no need to worry about volatility. There are several ways to get xDAI to use in apps. You can ask a friend who has some, get a tiny amount (enough for many simple transactions) from [the free faucet](https://www.xdaichain.com/for-users/get-xdai-tokens), get some on a centralized exchange, or convert DAI from mainnet Ethereum using the [Bridge](https://bridge.xdaichain.com/). To learn more about xDAI and other ways to get some check out [this guide](https://www.xdaichain.com/for-users/get-xdai-tokens).

### How do I connect my Ethereum wallet to the xDAI network?

You'll need to copy and paste these items into your wallet's "Custom RPC" settings. A full guide can be found [here](https://www.xdaichain.com/for-users/wallets/metamask/metamask-setup).

**Network Name**: xDai
**New RPC URL**: https://rpc.xdaichain.com/
**Chain ID**: 0x64 (100)
**Symbol**: xDai
**Block Explorer URL**: https://blockscout.com/xdai/mainnet

## How do I see my tokens?

You can add our token smart contract address to your list of tokens in your wallet. The address is `0xAe7ca55Ce4511C848ac4F9C0F26abD9ecaaee2c6`.

Any individual token can be found by going to *https://niftychess.com/games/{game moves hash}*. For example: https://niftychess.com/games/0x2d6109db2f31512f16ecc0caae6706b56027f713ee6fbc9e06cf4170419d3411

User profiles are coming soon. OpenSea integration is also under development.

## How do I transfer my Nifty Chess token to someone else?

Transfers are built into our ERC-721 standard contracts. page on our site for doing this coming soon.

## How do I redeem my Nifty Chess token on xDAI for one on Mainnet Ethereum?

Our mainnet bridge is built and we are currently working on deploying it in the best possible way to reduce fees for our users. Coming soon, ETA March 2021.

## Is the contract deployed on any test networks?

Not currently.

## Where can I keep up with development?

Discord or a forum coming soon, please follow us on twitter: https://twitter.com/NiftyChess

## How are gifs created and stored?

Gifs are NOT stored on any centralized server. They are generated on the spot based on the moves played in the game which each token represents.

## Is there an official OpenSea collection?

Our OpenSea integration is currently under development. ETA March 2021.

## How did Nifty Chess come to be?

Nifty Chess was created by Patrick Galligher and Joseph Schiarizzi, and first presented to the world in February, 2021.

At the buildathon, EthDenver 2020, a solidity developer named Joseph Schiarizzi brought a chess set. Having found it a great way to meet and interact with people at the conference, he aimed to one day build an app on Ethereum that involved chess. A year later at EthDenver 2021 Joseph teamed up with dApp developer extraordinaire Patrick Galligher to create Nifty Chess, with the goals of creating something that was easy to use, could potentially onboard many new people to Ethereum, and most importantly was fun to use. Nifty Chess won second place at the buildathon and we have been building and growing it since.

## What other features are coming soon?

In the works:

- User profiles
- Easier to use xDAI to Mainnet Ethereum bridge
- Collections of certain openings or games by certain players
- Partnerships with top chess streamers and players
- Nifty Chess sponsored tournaments
- NFT airdrops for our early contributors and users
- Gif hosting on IPFS

Got another suggestion or need some more help? Ask us on [Twitter](https://twitter.com/NiftyChess).
