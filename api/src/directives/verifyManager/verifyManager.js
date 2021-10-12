import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { verifyManager as applicationVerifyManager } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user owns the related account
  """
  directive @verifyOwnership(id: String!) on FIELD_DEFINITION
`

const validate = ({ directiveArgs }) => {
  console.log(directiveArgs)
  const { id, guildId } = directiveArgs
  applicationVerifyManager({ id, guildId })
}

const verifyManager = createValidatorDirective(schema, validate)

export default verifyManager
