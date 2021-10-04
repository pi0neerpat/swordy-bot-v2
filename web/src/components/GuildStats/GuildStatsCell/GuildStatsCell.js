export const QUERY = gql`
  query GuildStatsQuery {
    guilds {
      userCount
      roleCount
      name
    }
  }
`

export const Loading = () => <>Loading...</>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ guildCount }) => {
  return (
    <>
      {guilds.map((guild) => (
        <GuildStats guild={guild} />
      ))}
    </>
  )
}
