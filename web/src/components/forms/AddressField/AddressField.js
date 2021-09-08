import { TextField } from '@redwoodjs/forms'

const AddressField = ({ defaultValue, name, validation }) => {
  return (
    <TextField
      name={name}
      defaultValue={defaultValue}
      validation={{
        ...validation,
        pattern: { value: /^(0x)?[0-9a-fA-F]{40}$/ },
      }}
      className="rw-input"
      placeholder="0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00"
      errorClassName="rw-input rw-input-error"
    />
  )
}

export default AddressField
