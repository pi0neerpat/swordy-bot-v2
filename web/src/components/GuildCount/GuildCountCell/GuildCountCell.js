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
  <div className="p-4">Couldn't load...</div>
)

export const Success = ({ guildCount }) => {
  return (
    <Counter
      currentAmount={guildCount}
      totalAmount={guildCount}
      decimals={0}
      rate={null}
    />
  )
}
