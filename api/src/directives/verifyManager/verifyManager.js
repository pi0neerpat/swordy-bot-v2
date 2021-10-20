import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { verifyManager as applicationVerifyManager } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user owns the related account
  """
  directive @verifyManager on FIELD_DEFINITION
`

const validate = async ({ context }) => {
  const { guildId } = context.variables
  await applicationVerifyManager(guildId)
}

const verifyManager = createValidatorDirective(schema, validate)

export default verifyManager
