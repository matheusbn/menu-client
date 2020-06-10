import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import { useSelector, useDispatch } from 'react-redux'
import { history } from 'router'

const useStyles = makeStyles(theme => ({
  root: {},
}))

function CurrentOrder(props) {
  const classes = useStyles()
  const order = useSelector(state => state.order)
  const dispatch = useDispatch(null)

  useEffect(() => {}, [])

  const handleConfirm = () => {
    // history.back()
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
      <BottomBar className={classes.bottombar}>
        <Button onClick={handleConfirm}>Fazer Pedido</Button>
      </BottomBar>
    </div>
  )
}

export default CurrentOrder
