import Role from 'src/components/Role/Role'

export const QUERY = gql`
  query FindRoleById($id: String!) {
    role: role(id: $id) {
      id
      name
      description
      guildId
      userHasRole
      tokens {
        type
        balance
        purchaseUrl
        chainId
        contractAddress
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Role not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ role, isEditing }) => {
  return <Role role={role} isEditing={isEditing} />
}
