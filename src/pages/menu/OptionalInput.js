import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  FormHelperText,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import { Add as AddIcon } from '@material-ui/icons'
import useGlobalState from 'hooks/useGlobalState'
import Restaurant from 'models/Restaurant'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'

const useStyles = makeStyles(theme => ({
  title: {
    backgroundColor: theme.palette.grey[200],
    width: '100vw',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    color: theme.palette.grey['700'],
    fontWeight: theme.typography.fontWeightMedium,
  },
  option: {
    display: 'flex',
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    margin: '0 10px',
    '&:last-child': {
      border: 'none',
    },
  },
  optionName: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
  },
}))

const OptionalInput = ({ optional }) => {
  const classes = useStyles()

  const handleChange = e => {
    console.log(e.target.value)
  }

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">
          <Typography variant="body2" className={classes.title}>
            {optional.name}
          </Typography>
        </FormLabel>

        <FormGroup>
          {optional.options.map(option => (
            <FormControlLabel
              control={<Checkbox color="primary" onChange={console.log} />}
              label={<Typography variant="body2">{option.name}</Typography>}
              labelPlacement="start"
              className={classes.option}
              classes={{
                label: classes.optionName,
              }}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  )
}

export default OptionalInput
