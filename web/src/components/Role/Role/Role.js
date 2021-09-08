import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

const REMOVE_GUILD_ROLE_MUTATION = gql`
  mutation removeGuildRoleMutation($id: String!, $roleId: String!) {
    removeGuildRole(id: $id, roleId: $roleId) {
      id
    }
  }
`

const Role = ({ role, isEditing }) => {
  const [removeRole] = useMutation(REMOVE_GUILD_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role removed')
      navigate(routes.guild({ id: role.guildId }))
    },
  })

  const onRemoveClick = () => {
    if (
      confirm(
        'Are you sure you want to remove token-access from the role ' +
          role.name +
          '?'
      )
    ) {
      removeRole({ variables: { id: role.guildId, roleId: role.id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className=" flex items-center justify-between rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">{role.name}</h2>
          {isEditing && (
            <nav className="rw-button-group">
              <button
                type="button"
                className="rw-button rw-button-red"
                onClick={onRemoveClick}
              >
                Remove token access
              </button>
            </nav>
          )}
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Token type</th>
              <td>{role.type}</td>
            </tr>
            <tr>
              <th>Token network</th>
              <td>{role.chainId}</td>
            </tr>
            <tr>
              <th>Token contract</th>
              <td>{role.contractAddress}</td>
            </tr>
            <tr>
              <th>Purchase URL</th>
              <td>{role.purchaseUrl}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Role
