import React from 'react'
import {
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import OptionalFormControl from './OptionalFormControl'
import { formatMoney } from 'helpers/utils'

interface OptionalCheckboxProps {
  optional: Optional
  value: [Option] | []
  onChange: (option) => void
}

const OptionalCheckbox = ({
  optional,
  value,
  onChange,
}: OptionalCheckboxProps) => {
  const { name, required, options } = optional
  const isRadio = required && required.max === 1

  const handleChange = e => {
    const { value: optionName, checked } = e.target
    const option = options.find(option => option.name === optionName)

    if (checked) return onChange([...value, option])
    onChange(value.filter(opt => opt !== option))
  }

  return (
    <OptionalFormControl requiredObj={optional.required}>
      <FormGroup>
        {options.map(option => (
          <FormControlLabel
            value={option.name}
            checked={(value || []).some(item => item.name === option.name)}
            label={
              <div>
                <Typography variant="body2">{option.name}</Typography>
                {option.price && (
                  <Typography variant="caption">
                    + R$ {formatMoney(option.price)}
                  </Typography>
                )}
              </div>
            }
            labelPlacement={'start'}
            className="optional-input__option"
            classes={{ label: 'optional-input__option-name' }}
            control={<Checkbox color="primary" onChange={handleChange} />}
          />
        ))}
      </FormGroup>
    </OptionalFormControl>
  )
}

export default OptionalCheckbox
