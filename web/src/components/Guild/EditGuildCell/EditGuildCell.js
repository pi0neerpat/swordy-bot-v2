import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

import GuildForm from 'src/components/Guild/GuildForm'

export const QUERY = gql`
  query EditGuildById($id: String!) {
    guild: guild(id: $id) {
      platformId
      platform
      name
      iconUrl
      description
    }
  }
`
const UPDATE_GUILD_MUTATION = gql`
  mutation UpdateGuildMutation($id: String!, $input: UpdateGuildInput!) {
    updateGuild(id: $id, input: $input) {
      platformId
      platform
      name
      iconUrl
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ guild }) => {
  const [updateGuild, { loading, error }] = useMutation(UPDATE_GUILD_MUTATION, {
    onCompleted: () => {
      toast.success('Guild updated')
      navigate('/')
    },
  })

  const onSave = (input, id) => {
    updateGuild({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Guild {guild.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GuildForm
          guild={guild}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
