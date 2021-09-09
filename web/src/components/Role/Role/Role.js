import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import { trimAddress, getNetworkNameFromId } from 'src/helpers/helpers'
import { CheckmarkIcon } from 'src/components/Icons'

const REMOVE_GUILD_ROLE_MUTATION = gql`
  mutation removeGuildRoleMutation($id: String!, $roleId: String!) {
    removeGuildRole(id: $id, roleId: $roleId) {
      id
    }
  }
`

const SYNC_GUILD_ROLE_MUTATION = gql`
  mutation syncRoleMutation($id: String!) {
    syncRole(id: $id) {
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
  const [syncRole] = useMutation(SYNC_GUILD_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role synced!')
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

  const onSyncClick = () => {
    // TODO: Toast to show loading
    syncRole({ variables: { id: role.id } })
  }

  const PromptButton = () => {
    if (isEditing)
      return (
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={onRemoveClick}
        >
          Remove token access
        </button>
      )
    if (role.userHasRole)
      return (
        <button
          type="button"
          className="rw-button rw-button-small"
          onClick={onSyncClick}
        >
          Re-Sync
        </button>
      )
    return (
      <button
        type="button"
        className="rw-button rw-button-green"
        onClick={onSyncClick}
      >
        Sync Role
      </button>
    )
  }

  return (
    <div className="flex  items-center flex-wrap rw-segment p-4 mt-4">
      <div className="items-center mb-4 justify-between">
        <div className="flex items-center flex-wrap">
          <h2 className="text-2xl">{role.name}</h2>
          {role.userHasRole && (
            <div className="ml-2">
              <CheckmarkIcon width="2rem" heigth="2rem" />
            </div>
          )}
          <p className="ml-1 sm:ml-4 text-grey-600">
            {getNetworkNameFromId(role.chainId)} • {role.type}
          </p>
        </div>
        <p className="sm:text-lg break-all">{role.contractAddress}</p>
        {role.purchaseUrl && (
          <a target="_blank" className="text-blue-600" href={role.purchaseUrl}>
            Token website
          </a>
        )}
      </div>
      <PromptButton className="sm:mt-4" />
    </div>
  )
}

export default Role
