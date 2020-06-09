import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AppBar from 'components/AppBar'
import { history } from 'router'
import useSetState from 'hooks/useSetState'

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
