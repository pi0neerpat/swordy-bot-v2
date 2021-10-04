import GuildStats from 'src/components/GuildStats/GuildStats'

export const QUERY = gql`
  query GuildStatsQuery {
    guildStats {
      iconUrl
      description
      name
      userCount
      roleCount
    }
  }
`

export const Loading = () => <>Loading...</>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <>Couldn't load community data...</>

export const Success = ({ guildStats }) => {
  return (
    <div>
      {guildStats.map((guild, index) => (
        <GuildStats key={index} guild={guild} />
      ))}
    </div>
  )
}
