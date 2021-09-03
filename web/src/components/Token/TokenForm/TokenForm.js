import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const TokenForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.token?.id)
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
          name="chainId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Chain id
        </Label>
        <TextField
          name="chainId"
          defaultValue={props.token?.chainId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="chainId" className="rw-field-error" />

        <Label
          name="contractAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Contract address
        </Label>
        <TextField
          name="contractAddress"
          defaultValue={props.token?.contractAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="contractAddress" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>
        <TextField
          name="type"
          defaultValue={props.token?.type}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token id
        </Label>
        <NumberField
          name="tokenId"
          defaultValue={props.token?.tokenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tokenId" className="rw-field-error" />

        <Label
          name="uri"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Uri
        </Label>
        <TextField
          name="uri"
          defaultValue={props.token?.uri}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="uri" className="rw-field-error" />

        <Label
          name="website"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Website
        </Label>
        <TextField
          name="website"
          defaultValue={props.token?.website}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="website" className="rw-field-error" />

        <Label
          name="iconUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Icon url
        </Label>
        <TextField
          name="iconUrl"
          defaultValue={props.token?.iconUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="iconUrl" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TokenForm
