import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Button, Typography } from '@material-ui/core'
import ItemOrderList from 'components/ItemOrderList'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import { addOrder } from 'actions'
import { useSelector, useDispatch } from 'react-redux'
import useToast from 'hooks/useToast'

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
  const stagingOrder: ItemOrder[] = useSelector(state => state.stagingOrder)
  const showToast = useToast()
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const handleConfirm = async () => {
    setLoading(true)
    const orderData: OrderData = {
      items: stagingOrder,
    }
    await dispatch(addOrder(orderData))
    setLoading(false)

    showToast('Pedido feito com sucesso!')
    history.back()
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

      <ItemOrderList className={classes.orderList} itemOrders={stagingOrder} />

      <BottomBar className={classes.bottomBar}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          endIcon={loading && <CircularProgress color="white" size={20} />}
        >
          Fazer Pedido
        </Button>
      </BottomBar>
    </div>
  )
}

export default StagingOrder
