export const standard = defineScenario({
  role: {
    one: {
      name: 'String',
      platformId: 'String',
      balance: 'String',
      guild: {
        create: { platformId: 'String', platform: 'String', name: 'String' },
      },

      token: {
        create: {
          chainId: 'String',
          contractAddress: 'String',
          type: 'String',
        },
      },
    },

    two: {
      name: 'String',
      platformId: 'String',
      balance: 'String',
      guild: {
        create: { platformId: 'String', platform: 'String', name: 'String' },
      },

      token: {
        create: {
          chainId: 'String',
          contractAddress: 'String',
          type: 'String',
        },
      },
    },
  },
})
