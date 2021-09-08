import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'

import { CheckmarkIcon } from 'src/components/Icons'

const REMOVE_GUILD_ROLE_MUTATION = gql`
  mutation removeGuildRoleMutation($id: String!, $roleId: String!) {
    removeGuildRole(id: $id, roleId: $roleId) {
      id
    }
  }
`

const SYNC_GUILD_ROLE_MUTATION = gql`
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
    syncRole({ variables: { id: role.guildId, roleId: role.id } })
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
    if (role.userHasRole) return <CheckmarkIcon width="2rem" heigth="2rem" />
    return (
      <button
        type="button"
        className="rw-button rw-button-green"
        onClick={onSyncClick}
      >
        Get Role
      </button>
    )
  }

  return (
    <div className="flex justify-between items-center">
      <div className="items-center">
        <div className="flex items-center">
          <h2 className="text-2xl">{role.name}</h2>
          <p className="ml-4">
            {role.chainId} • {role.type}
          </p>
        </div>
        <div>{role.contractAddress}</div>
        {role.purchaseUrl && (
          <a target="_blank" className="text-blue-600" href={role.purchaseUrl}>
            Token website
          </a>
        )}
      </div>
      <PromptButton />
    </div>
  )
}

export default Role
