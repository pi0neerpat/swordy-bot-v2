import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { routes, navigate } from '@redwoodjs/router'
import RoleUpdateForm from 'src/components/Role/RoleUpdate/RoleUpdateForm'

const UPDATE_GUILD_ROLE_MUTATION = gql`
  mutation addRoleTokenMutation(
    $guildId: String!
    $roleId: String!
    $contractAddress: String!
    $chainId: String!
    $type: String!
    $tokenId: Int
  ) {
    addRoleToken(
      guildId: $guildId
      contractAddress: $contractAddress
      roleId: $roleId
      chainId: $chainId
      type: $type
      tokenId: $tokenId
    ) {
      id
    }
  }
`

const RoleUpdate = ({ role, guildId }) => {
  const [addRoleToken, { loading, error }] = useMutation(
    UPDATE_GUILD_ROLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Role is now token-gated')
        navigate(routes.guild({ id: guildId }))
      },
    }
  )

  const onSave = (input, id) => {
    addRoleToken({
      variables: {
        guildId,
        roleId: id,
        ...input,
        tokenId: Number(input.tokenId),
      },
    })
  }

  return (
    <div>
      <RoleUpdateForm
        role={role}
        onSave={onSave}
        error={error}
        loading={loading}
      />
    </div>
  )
}

export default RoleUpdate
