import { SelectField } from '@redwoodjs/forms'
import { TOKEN_TYPES } from 'src/helpers/constants.js'

const TypeDropdown = ({ defaultValue, name, validation }) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      validation={validation}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      {TOKEN_TYPES.map((type) => (
        <option value={type.value} key={type.value}>
          {type.text}
        </option>
      ))}
    </SelectField>
  )
}

export default TypeDropdown
