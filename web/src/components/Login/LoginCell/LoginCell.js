export const QUERY = gql`
  query FindLoginQuery($id: Int!) {
    login: login(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ login }) => {
  return <div>{JSON.stringify(login)}</div>
}
