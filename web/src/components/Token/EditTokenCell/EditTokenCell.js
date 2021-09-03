import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import TokenForm from 'src/components/Token/TokenForm'

export const QUERY = gql`
  query EditTokenById($id: String!) {
    token: token(id: $id) {
      id
      chainId
      contractAddress
      type
      tokenId
      uri
      website
      iconUrl
    }
  }
`
const UPDATE_TOKEN_MUTATION = gql`
  mutation UpdateTokenMutation($id: String!, $input: UpdateTokenInput!) {
    updateToken(id: $id, input: $input) {
      id
      chainId
      contractAddress
      type
      tokenId
      uri
      website
      iconUrl
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ token }) => {
  const [updateToken, { loading, error }] = useMutation(UPDATE_TOKEN_MUTATION, {
    onCompleted: () => {
      toast.success('Token updated')
      navigate(routes.tokens())
    },
  })

  const onSave = (input, id) => {
    const castInput = Object.assign(input, { tokenId: parseInt(input.tokenId) })
    updateToken({ variables: { id, input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Token {token.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <TokenForm
          token={token}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
