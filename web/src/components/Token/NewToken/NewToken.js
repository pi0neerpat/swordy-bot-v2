import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import TokenForm from 'src/components/Token/TokenForm'

const CREATE_TOKEN_MUTATION = gql`
  mutation CreateTokenMutation($input: CreateTokenInput!) {
    createToken(input: $input) {
      id
    }
  }
`

const NewToken = () => {
  const [createToken, { loading, error }] = useMutation(CREATE_TOKEN_MUTATION, {
    onCompleted: () => {
      toast.success('Token created')
      navigate(routes.tokens())
    },
  })

  const onSave = (input) => {
    const castInput = Object.assign(input, { tokenId: parseInt(input.tokenId) })
    createToken({ variables: { input: castInput } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Token</h2>
      </header>
      <div className="rw-segment-main">
        <TokenForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewToken
