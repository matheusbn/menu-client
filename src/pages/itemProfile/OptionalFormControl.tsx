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
  root: {
    display: 'block',
    '& .optional-input__option': {
      display: 'flex',
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      margin: `0 ${theme.spacing(1)}px`,
      padding: theme.spacing(1),
      '&:last-child': {
        border: 'none',
      },
    },
    '& .optional-input__option-name': {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.grey['700'],
  },
  titleContainer: {
    width: '100%',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
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

  let text
  if (max > 1) text = `Escolha até ${max} opções`
  else text = `Escolha no mínimo ${min} ${min > 1 ? 'opções' : 'opção'}`

  return <Typography variant="caption">{text}</Typography>
}

const OptionalFormControl = ({ children, label, requiredObj }) => {
  const classes = useStyles()

  return (
    <FormControl component="fieldset" className={classes.root}>
      <div className={classes.titleContainer}>
        <div style={{ flexGrow: 1 }}>
          <FormLabel component="legend">
            <Typography variant="body2" className={classes.title}>
              {label}
            </Typography>
          </FormLabel>

          <Observation requiredObj={requiredObj} />
        </div>

        {requiredObj && (
          <div className={classes.requiredBadge}>Obrigatório</div>
        )}
      </div>

      {children}
    </FormControl>
  )
}

export default OptionalFormControl
