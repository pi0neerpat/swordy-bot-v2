import {
  Form,
  FormError,
  FieldError,
  Submit,
  Label,
  TextField,
} from '@redwoodjs/forms'
import AddressField from 'src/components/forms/AddressField'
import TypeDropdown from 'src/components/forms/TypeDropdown'
import NetworkDropdown from 'src/components/forms/NetworkDropdown'
// import { TOKEN_TYPES } from 'src/helpers/constants.js'

const RoleUpdateForm = (props) => {
  const [showTokenId, setShowTokenId] = React.useState()
  const onSubmit = (data) => {
    props.onSave(data, props?.role?.id)
  }

  const handleFormChange = (e) => {
    if (e.target.name === 'type') {
      if (e.target.value === 'erc1155') return setShowTokenId(true)
      return setShowTokenId(false)
    }
  }

  return (
    <div className="rw-form-wrapper ">
      <Form error={props.error} onSubmit={onSubmit} onChange={handleFormChange}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name={`type`}
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token type
        </Label>
        <TypeDropdown name={`type`} validation={{ required: true }} />
        <FieldError name={`type`} className="rw-field-error" />
        {showTokenId && (
          <>
            <Label
              name={`tokenId`}
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Token ID
            </Label>
            <TextField
              name="tokenId"
              validation={{
                required: true,
                pattern: { value: /^[0-9]$/ },
              }}
              className="rw-input"
              placeholder="1"
              errorClassName="rw-input rw-input-error"
            />
            <FieldError name={`tokenId`} className="rw-field-error" />
          </>
        )}

        <Label
          name={`chainId`}
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token network
        </Label>
        <NetworkDropdown name={`chainId`} validation={{ required: true }} />
        <FieldError name={`chainId`} className="rw-field-error" />

        <Label
          name={`contractAddress`}
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token contract
        </Label>
        <AddressField
          name={`contractAddress`}
          validation={{ required: true }}
        />
        <FieldError name={`contractAddress`} className="rw-field-error" />
        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Submit
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RoleUpdateForm
