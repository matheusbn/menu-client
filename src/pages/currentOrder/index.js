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
import { history } from 'router'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import useSetState from 'hooks/useSetState'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'
import OptionalInput from './OptionalInput'
import BottomBar from 'components/BottomBar'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {},
}))

function CurrentOrder({ item, addItems }) {
  const classes = useStyles()
  const opacityThreshold = useRef(null)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  const handleConfirm = () => {
    history.back()
  }

  return (
    <div>
      <AppBar
        backButton
        title={
          <Typography variant="button" component="h1">
            Pedido Atual
          </Typography>
        }
      />

      <section></section>
    </div>
  )
}

export default CurrentOrder
