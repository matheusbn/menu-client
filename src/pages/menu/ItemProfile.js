import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons'
import useGlobalState from 'hooks/useGlobalState'
import Restaurant from 'models/Restaurant'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'
import OptionalInput from './OptionalInput'

const useStyles = makeStyles(theme => ({
  root: {
    height: '200vh',
  },
  picture: {
    width: '100vw',
    height: '40vh',
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  optionalTitle: {
    backgroundColor: theme.palette.grey[200],
    width: '100vw',
    height: 45,
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    color: theme.palette.grey['900'],
  },
}))

function ItemProfile(props) {
  const classes = useStyles()
  const opacityThreshold = useRef(null)
  const [state, setState] = useGlobalState()
  const { item } = props

  console.log(props.item)

  return (
    <div>
      <AppBar backButton opacityThreshold={opacityThreshold} />

      <section>
        <img src={item.pictures[0]} className={classes.picture} />

        <div className={classes.root}>
          <div style={{ margin: '5px 15px' }}>
            <Typography
              variant="h6"
              component="h1"
              ref={opacityThreshold}
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography className={classes.description}>
              {item.description}
            </Typography>
          </div>

          {(item.optionals || []).map(optional => (
            <OptionalInput optional={optional} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default ItemProfile
