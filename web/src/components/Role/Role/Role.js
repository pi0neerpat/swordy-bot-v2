import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import { getNetworkNameFromId, truncate } from 'src/helpers/helpers'
import { CheckmarkIcon } from 'src/components/Icons'
import RoleUpdate from 'src/components/Role/RoleUpdate'

const REMOVE_ROLE_TOKEN_MUTATION = gql`
  mutation removeRoleTokenMutation(
    $guildId: String!
    $roleId: String!
    $tokenId: String!
  ) {
    removeRoleToken(guildId: $guildId, roleId: $roleId, tokenId: $tokenId) {
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
  const [showForm, setShowForm] = React.useState(false)

  const [removeRoleToken] = useMutation(REMOVE_ROLE_TOKEN_MUTATION, {
    onCompleted: () => {
      toast.success('Token removed')
      navigate(routes.guild({ id: role.guildId }))
    },
  })
  const [syncRole] = useMutation(SYNC_GUILD_ROLE_MUTATION)

  const onRemoveClick = (token) => {
    if (
      confirm(
        'Are you sure you want to remove token access from the role ' +
          role.name +
          ' for token ' +
          truncate(token.contractAddress, 10) +
          '?'
      )
    ) {
      removeRoleToken({
        variables: {
          guildId: role.guildId,
          roleId: role.id,
          tokenId: token.id,
        },
      })
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
  }

  const onSyncClick = async ({ resync }) => {
    if (resync) {
      if (
        confirm(
          'Warning: this will remove your role if you no longer have the right tokens in this wallet!'
        )
      ) {
        await completeSyncWithToast()
      }
    } else {
      await completeSyncWithToast()
    }
  }

  return (
    <div className=" items-center justify-between rw-segment p-4 mt-4">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex">
          <h2 className="text-2xl">{role.name}</h2>
          {role.userHasRole && (
            <div className="ml-2">
              <CheckmarkIcon width="2rem" heigth="2rem" />
            </div>
          )}
        </div>
        {!isEditing && (
          <div className="mt-4 sm:mt-0 ">
            <button
              type="button"
              className={`rw-button ${
                role.userHasRole ? 'rw-button-small' : 'rw-button-green'
              }`}
              onClick={() => onSyncClick({ resync: role.userHasRole })}
            >
              {role.userHasRole ? 'Re-Sync' : 'Sync Role'}
            </button>
          </div>
        )}
      </div>
      {role.tokens.map((token) => (
        <div
          className="flex  items-center flex-wrap justify-between mt-4"
          key={token.id}
        >
          <div className="flex  items-center flex-wrap justify-between ">
            <p className="text-grey-600">
              {getNetworkNameFromId(token.chainId)} • {token.type}
              {' • '}
            </p>
            <p className="sm:text-lg break-all ml-2">{token.contractAddress}</p>
            {token.purchaseUrl && (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
                href={token.purchaseUrl}
                rel="noreferrer"
              >
                Token website
              </a>
            )}
          </div>
          {isEditing && (
            <button
              type="button"
              className="rw-button rw-button-red"
              onClick={() => onRemoveClick(token)}
            >
              Remove token
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <button
          className="rw-button  rw-button-green mt-4"
          onClick={() => setShowForm(!showForm)}
        >
          Add token
        </button>
      )}
      {showForm && (
        <div className="mt-4">
          <RoleUpdate role={role} guildId={role.guildId} />
        </div>
      )}
    </div>
  )
}

export default Role
