const abi = [
  {
    type: 'function',
    stateMutability: 'view',
    payable: false,
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'balanceOf',
    inputs: [
      { type: 'address', name: 'owner', internalType: 'address' },
      { type: 'uint256', name: 'tokenId', internalType: 'uint256' },
    ],
    constant: true,
  },
]

export default abi
