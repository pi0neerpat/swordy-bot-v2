import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes, navigate } from '@redwoodjs/router'
import {
  trimAddress,
  getNetworkNameFromId,
  truncate,
} from 'src/helpers/helpers'
import { CheckmarkIcon } from 'src/components/Icons'

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
  const [isLoading, setIsLoading] = React.useState(false)

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
        <>
          <button
            className="rw-button rw-button-small mt-4 flex"
            onClick={(input) => {
              const copy = tokenList
              copy[tokenList.length] = emptyToken
              setTokenList(copy)
            }}
          >
            Add token
          </button>
        </>
      )
  }

  return (
    <div className=" items-center justify-between rw-segment p-4 mt-4">
      <div className="flex items-center justify-between flex-wrap">
        <h2 className="text-2xl">{role.name}</h2>
        {role.userHasRole && (
          <div className="ml-2">
            <CheckmarkIcon width="2rem" heigth="2rem" />
          </div>
        )}
        {!isEditing && (
          <div className="mt-4 sm:mt-0 ">
            <button
              type="button"
              className={`rw-button ${
                role.userHasRole ? 'rw-button-small' : 'rw-button-green'
              }`}
              disabled={isLoading}
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
            </p>
            <p className="sm:text-lg break-all ml-2">{token.contractAddress}</p>
            {token.purchaseUrl && (
              <a
                target="_blank"
                className="text-blue-600"
                href={token.purchaseUrl}
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
              disabled={isLoading}
            >
              Remove token
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

export default Role
