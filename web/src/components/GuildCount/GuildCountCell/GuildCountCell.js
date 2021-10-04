import Counter from 'src/components/GuildCount/Counter'

export const QUERY = gql`
  query FindGuildCountQuery {
    guildCount
  }
`

export const Loading = () => (
  <Counter currentAmount={0} totalAmount={0} rate={0} isLoading />
)

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ guildCount }) => {
  return (
    <Counter currentAmount={guildCount} totalAmount={guildCount} rate={null} />
  )
}
