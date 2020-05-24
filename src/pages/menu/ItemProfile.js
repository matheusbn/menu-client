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
import useSetState from 'hooks/useSetState'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'
import OptionalInput from './OptionalInput'
import BottomBar from 'components/BottomBar'

const useStyles = makeStyles(theme => ({
  root: {},
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
  const { item } = props
  const [state, setState] = useSetState({})

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
            <OptionalInput
              optional={optional}
              value={state[optional.name]}
              onChange={value => setState({ [optional.name]: value })}
            />
          ))}
        </div>
      </section>

      <BottomBar>
        <h3>ola mundo</h3>
      </BottomBar>
    </div>
  )
}

export default ItemProfile
