import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import NetworkDropdown from 'src/components/forms/NetworkDropdown'
import TypeDropdown from 'src/components/forms/TypeDropdown'
import AddressField from 'src/components/forms/AddressField'

const ServerRoleForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.role?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token type
        </Label>
        <TypeDropdown name="type" validation={{ required: true }} />
        <FieldError name="type" className="rw-field-error" />

        <Label
          name="chainId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token network
        </Label>
        <NetworkDropdown name="chainId" validation={{ required: true }} />
        <FieldError name="chainId" className="rw-field-error" />

        <Label
          name="contractAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token contract
        </Label>
        <AddressField
          name="contractAddress"
          defaultValue={props.dapp?.contract}
          validation={{ required: true }}
        />
        <FieldError name="contractAddress" className="rw-field-error" />

        {/*    <Label
          name="balance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token balance (required for type "ERC20")
        </Label>
        <TextField
          name="balance"
          defaultValue={props.role?.balance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="balance" className="rw-field-error" />
*/}

        <Label
          name="purchaseUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Purchase URL (optional)
        </Label>
        <TextField
          name="purchaseUrl"
          placeholder="https://mytoken.finance"
          defaultValue={props.role?.purchaseUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />
        <FieldError name="purchaseUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Add Token Access
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ServerRoleForm
