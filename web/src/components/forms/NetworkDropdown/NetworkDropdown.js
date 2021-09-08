import { SelectField } from '@redwoodjs/forms'
import { availableNetworks } from 'src/constants.js'

const NetworkDropdown = ({ defaultValue, name, validation }) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      validation={validation}
      className="rw-input"
    >
      {availableNetworks.map((net) => (
        <option key={net}>{net}</option>
      ))}
    </SelectField>
  )
}

export default NetworkDropdown
