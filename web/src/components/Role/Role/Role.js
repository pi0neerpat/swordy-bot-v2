import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import {
  trimAddress,
  getNetworkNameFromId,
  truncate,
} from 'src/helpers/helpers'
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
      userHasRole
    }
  }
`

const Role = ({ role, isEditing }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const [removeRole] = useMutation(REMOVE_GUILD_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role removed')
      navigate(routes.guild({ id: role.guildId }))
    },
  })
  const [syncRole] = useMutation(SYNC_GUILD_ROLE_MUTATION)

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

  const completeSyncWithToast = async () => {
    toast.promise(syncRole({ variables: { id: role.id } }), {
      loading: 'Loading',
      success: `You earned the role!`,
      error: (err) => {
        if (err?.message.includes('token')) return err.message
        return `Something went wrong. ${truncate(err?.message, 100)}`
      },
    })
    // toast.loading('Syncing...')
    // try {
    //   const { data } = await syncRole({ variables: { id: role.id } })
    //   toast.warning("Sorry you don't have the right tokens in your wallet")
    //   if (data.syncRole.userHasRole) {
    //     // toast.dismiss()
    //     toast.success('You earned the role!')
    //   } else {
    //     // toast.dismiss()
    //     navigate(routes.guild({ id: role.guildId }))
    //   }
    // } catch (e) {
    //   toast.dismiss()
    //   toast.error(`Something went wrong. ${truncate(err?.message, 100)}`)
    // }
  }

  const onSyncClick = async ({ resync }) => {
    if (resync) {
      if (
        confirm(
          'Warning: this may remove the role if you no longer have the right token!'
        )
      ) {
        await completeSyncWithToast()
      }
    } else {
      await completeSyncWithToast()
    }
  }

  const PromptButton = () => {
    if (isEditing)
      return (
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={onRemoveClick}
          disabled={isLoading}
        >
          Remove token access
        </button>
      )
    if (role.userHasRole)
      return (
        <button
          type="button"
          className="rw-button rw-button-small"
          disabled={isLoading}
          onClick={() => onSyncClick({ resync: true })}
        >
          Re-Sync
        </button>
      )
    return (
      <button
        type="button"
        className="rw-button rw-button-green"
        onClick={onSyncClick}
        disabled={isLoading}
      >
        Sync Role
      </button>
    )
  }

  return (
    <div className="flex  items-center flex-wrap justify-between rw-segment p-4 mt-4">
      <div className="items-center justify-between">
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
      <div className="mt-4 sm:mt-0 ">
        <PromptButton />
      </div>
    </div>
  )
}

export default Role
