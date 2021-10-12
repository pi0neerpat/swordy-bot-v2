import gql from 'graphql-tag'

import { createValidatorDirective } from '@redwoodjs/graphql-server'

import { verifyOwnership as applicationVerifyOwnership } from 'src/lib/auth'

export const schema = gql`
  """
  Use to check whether or not a user owns the related account
  """
  directive @verifyOwnership(id: String!) on FIELD_DEFINITION
`

const validate = ({ directiveArgs }) => {
  const { id } = directiveArgs
  applicationVerifyOwnership(id)
}

const verifyOwnership = createValidatorDirective(schema, validate)

export default verifyOwnership
