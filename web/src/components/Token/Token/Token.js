import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const DELETE_TOKEN_MUTATION = gql`
  mutation DeleteTokenMutation($id: String!) {
    deleteToken(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Token = ({ token }) => {
  const [deleteToken] = useMutation(DELETE_TOKEN_MUTATION, {
    onCompleted: () => {
      toast.success('Token deleted')
      navigate(routes.tokens())
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete token ' + id + '?')) {
      deleteToken({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Token {token.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{token.id}</td>
            </tr>
            <tr>
              <th>Chain id</th>
              <td>{token.chainId}</td>
            </tr>
            <tr>
              <th>Contract address</th>
              <td>{token.contractAddress}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{token.type}</td>
            </tr>
            <tr>
              <th>Token id</th>
              <td>{token.tokenId}</td>
            </tr>
            <tr>
              <th>Uri</th>
              <td>{token.uri}</td>
            </tr>
            <tr>
              <th>Website</th>
              <td>{token.website}</td>
            </tr>
            <tr>
              <th>Icon url</th>
              <td>{token.iconUrl}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editToken({ id: token.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(token.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Token
