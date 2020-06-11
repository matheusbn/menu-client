import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import ItemOrder from './ItemOrder'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import { useSelector, useDispatch } from 'react-redux'
import { formatMoney, createKeyGenerator } from 'helpers/utils'

const genKey = createKeyGenerator()

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 60,
  },
  section: {
    minHeight: '82vh',
    display: 'flex',
    flexDirection: 'column',
  },
  orderList: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  bottomBar: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  totalPriceContainer: {},
  totalPrice: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: theme.spacing(2),
    paddingBottom: 0,

    '& span': {
      ...theme.typography.button,
      height: 'fit-content',
    },
  },
}))

function CurrentOrder(props) {
  const classes = useStyles()
  const order = useSelector(state => state.order)
  const dispatch = useDispatch(null)

  useEffect(() => {}, [])

  const handleConfirm = () => {
    // history.back()
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

      <section className={classes.section}>
        <ul className={classes.orderList}>
          {order.map(itemOrder => (
            <ItemOrder key={genKey()} itemOrder={itemOrder} />
          ))}
        </ul>

        <hr />

        <Typography variant="h5" component="p" className={classes.totalPrice}>
          <span>Total:</span>
          <div className="currency">{formatMoney(totalPrice)}</div>
        </Typography>
      </section>

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
