import { SelectField } from '@redwoodjs/forms'
import { EIP_155_NETWORK_SPEC } from 'src/helpers/constants.js'

const NetworkDropdown = ({ defaultValue, name, validation }) => {
  return (
    <SelectField
      name={name}
      defaultValue={defaultValue}
      validation={validation}
      className="rw-input"
    >
      {EIP_155_NETWORK_SPEC.map((net) => (
        <option value={net.chainId} key={net.chainId}>
          {net.name}
        </option>
      ))}
    </SelectField>
  )
}

export default NetworkDropdown
