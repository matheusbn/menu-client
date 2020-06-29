import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import ItemOrderList from 'components/ItemOrderList'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import { addOrder } from 'actions'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 60,
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
  orderList: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  bottomBar: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
}))

function StagingOrder(props) {
  const classes = useStyles()
  const stagingOrder: Order = useSelector(state => state.stagingOrder)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    history.back()

    stagingOrder.orderedAt = new Date()
    // prevent list of items disappearing before the page changes
    setTimeout(() => dispatch(addOrder(stagingOrder)), 50)
  }

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

      <ItemOrderList
        className={classes.orderList}
        itemOrders={stagingOrder.items}
      />

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

export default StagingOrder
