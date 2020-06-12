import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  RadioGroup,
  Radio,
  TextField,
  FormHelperText,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import { Add as AddIcon } from '@material-ui/icons'
import Restaurant from 'models/Restaurant'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['700'],
  },
  titleContainer: {
    width: '100vw',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  option: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    margin: `0 ${theme.spacing(1)}px`,
    padding: theme.spacing(1),
    '&:last-child': {
      border: 'none',
    },
  },
  optionName: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
  },
  requiredBadge: {
    ...theme.typography.button,
    fontSize: '0.6rem',
    letterSpacing: '0.06em',
    padding: '2px 5px',
    borderRadius: 100,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))

const Observation = ({ requiredObj }) => {
  const { min, max } = requiredObj

  if ((!min && !max) || max === 1) return null

  let text = null
  if (max > 1) text = `Escolha até ${max} opções`
  else text = `Escolha no mínimo ${min} ${min > 1 ? 'opções' : 'opção'}`

  return <Typography variant="caption">{text}</Typography>
}

const OptionalInput = ({ optional, value, onChange }) => {
  const classes = useStyles()
  const { name, required, options } = optional
  const isRadio = required && required.max === 1

  const handleChange = e => {
    const { value: optionName, checked } = e.target
    const option = options.find(option => option.name === optionName)

    if (isRadio) return onChange(option)

    value = value || []
    if (checked) return onChange([...value, option])
    onChange(value.filter(opt => opt !== option))
  }

  const getControlLabelProps = option => {
    let checked = false
    if (value) {
      if (isRadio) checked = value.name === option.name
      else checked = (value || []).some(item => item.name === option.name)
    }

    return {
      value: option.name,
      checked,
      label: (
        <div>
          <Typography variant="body2">{option.name}</Typography>
          {option.price && (
            <Typography variant="caption">
              + R$ {formatMoney(option.price)}
            </Typography>
          )}
        </div>
      ),
      labelPlacement: 'start',
      className: classes.option,
      classes: {
        label: classes.optionName,
      },
    }
  }

  return (
    <div>
      <FormControl component="fieldset">
        <div className={classes.titleContainer}>
          <div style={{ flexGrow: 1 }}>
            <FormLabel component="legend">
              <Typography variant="body2" className={classes.title}>
                {name}
              </Typography>
            </FormLabel>

            <Observation requiredObj={required} />
          </div>

          {required && <div className={classes.requiredBadge}>Obrigatório</div>}
        </div>

        {isRadio ? (
          <RadioGroup aria-label={optional.name} onChange={handleChange}>
            {options.map(option => (
              <FormControlLabel
                {...getControlLabelProps(option)}
                control={<Radio color="primary" />}
              />
            ))}
          </RadioGroup>
        ) : (
          <FormGroup>
            {options.map(option => (
              <FormControlLabel
                {...getControlLabelProps(option)}
                control={<Checkbox color="primary" onChange={handleChange} />}
              />
            ))}
          </FormGroup>
        )}
      </FormControl>
    </div>
  )
}

export default OptionalInput
