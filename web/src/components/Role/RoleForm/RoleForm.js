import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const RoleForm = (props) => {
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          defaultValue={props.role?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="platformId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Platform id
        </Label>
        <TextField
          name="platformId"
          defaultValue={props.role?.platformId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="platformId" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>
        <TextField
          name="description"
          defaultValue={props.role?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="balance"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Balance
        </Label>
        <TextField
          name="balance"
          defaultValue={props.role?.balance}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="balance" className="rw-field-error" />

        <Label
          name="purchaseUrl"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Purchase url
        </Label>
        <TextField
          name="purchaseUrl"
          defaultValue={props.role?.purchaseUrl}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="purchaseUrl" className="rw-field-error" />

        <Label
          name="guildPlatformId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Guild platform id
        </Label>
        <TextField
          name="guildPlatformId"
          defaultValue={props.role?.guildPlatformId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="guildPlatformId" className="rw-field-error" />

        <Label
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Token id
        </Label>
        <TextField
          name="tokenId"
          defaultValue={props.role?.tokenId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="tokenId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RoleForm
