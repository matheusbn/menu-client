import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ItemOrderListItem from '../../components/ItemOrderListItem'
import { formatMoney, createKeyGenerator } from 'helpers/utils'

const genKey = createKeyGenerator()

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  },
  orderList: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
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

function OrderList({ order }: { order: Order }) {
  const classes = useStyles()

  const alreadyOrdered = !!order.orderedAt
  const totalPrice = order.reduce((sum, { price }) => sum + price, 0)

  return (
    <div className={classes.root}>
      <ul className={classes.orderList}>
        {order.map(itemOrder => (
          <ItemOrderListItem
            key={genKey()}
            itemOrder={itemOrder}
            alreadyOrdered={alreadyOrdered}
          />
        ))}
      </ul>

      {!!order.length && <hr style={{ margin: 0 }} />}

      <Typography variant="h5" component="p" className={classes.totalPrice}>
        <span>Total:</span>
        <div className="currency">{formatMoney(totalPrice)}</div>
      </Typography>
    </div>
  )
}

export default OrderList
