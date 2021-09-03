import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import GuildForm from 'src/components/Guild/GuildForm'

const CREATE_GUILD_MUTATION = gql`
  mutation CreateGuildMutation($input: CreateGuildInput!) {
    createGuild(input: $input) {
      id
    }
  }
`

const NewGuild = () => {
  const [createGuild, { loading, error }] = useMutation(CREATE_GUILD_MUTATION, {
    onCompleted: () => {
      toast.success('Guild created')
      navigate(routes.guilds())
    },
  })

  const onSave = (input) => {
    createGuild({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Guild</h2>
      </header>
      <div className="rw-segment-main">
        <GuildForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGuild
