import { SelectField } from '@redwoodjs/forms'
import { availableTokenTypes } from 'src/constants.js'

const TypeDropdown = ({ defaultValue, name, validation }) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      validation={validation}
      className="rw-input"
      errorClassName="rw-input rw-input-error"
    >
      {availableTokenTypes.map((type) => (
        <option value={type.value} key={type.value}>
          {type.text}
        </option>
      ))}
    </SelectField>
  )
}

export default TypeDropdown
