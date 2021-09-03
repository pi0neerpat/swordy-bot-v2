import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import RoleForm from 'src/components/Role/RoleForm'

const CREATE_ROLE_MUTATION = gql`
  mutation CreateRoleMutation($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
    }
  }
`

const NewRole = () => {
  const [createRole, { loading, error }] = useMutation(CREATE_ROLE_MUTATION, {
    onCompleted: () => {
      toast.success('Role created')
      navigate(routes.roles())
    },
  })

  const onSave = (input) => {
    createRole({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Role</h2>
      </header>
      <div className="rw-segment-main">
        <RoleForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRole
