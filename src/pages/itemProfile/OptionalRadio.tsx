import React from 'react'
import {
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core'
import OptionalFormControl from './OptionalFormControl'
import { formatMoney } from 'helpers/utils'

interface OptionalRadioProps {
  optional: Optional
  value: Option
  onChange: (option) => void
}

const OptionalRadio = ({ optional, value, onChange }: OptionalRadioProps) => {
  const { name, required, options } = optional

  const handleChange = e => {
    const { value: optionName, checked } = e.target
    const option = options.find(option => option.name === optionName)

    return onChange(option)
  }

  return (
    <OptionalFormControl requiredObj={optional.required} label={optional.name}>
      <RadioGroup aria-label={optional.name} onChange={handleChange}>
        {options.map(option => (
          <FormControlLabel
            value={option.name}
            checked={value && value.name === option.name}
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
            control={<Radio color="primary" />}
          />
        ))}
      </RadioGroup>
    </OptionalFormControl>
  )
}

export default OptionalRadio
