import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import OrderList from './OrderList'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import { addOrder } from 'actions'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 60,
  },
  bottomBar: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}))

function CurrentOrder(props) {
  const classes = useStyles()
  const order: Order = useSelector(state => state.order)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    order.orderedAt = new Date()

    dispatch(addOrder(order))
    history.back()
  }

  const totalPrice = order.reduce((sum, { price }) => sum + price, 0)

  return (
    <div className={classes.root}>
      <AppBar
        backButton
        title={
          <Typography variant="button" component="h1">
            Pedido Atual
          </Typography>
        }
      />

      <OrderList order={order} />

      <BottomBar className={classes.bottomBar}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleConfirm}
        >
          Fazer Pedido
        </Button>
      </BottomBar>
    </div>
  )
}

export default CurrentOrder
