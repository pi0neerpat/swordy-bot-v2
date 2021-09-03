import Guild from 'src/components/Guild/Guild'

export const QUERY = gql`
  query FindGuildById($id: String!) {
    guild: guild(id: $id) {
      platformId
      platform
      name
      iconUrl
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Guild not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guild }) => {
  return <Guild guild={guild} />
}
