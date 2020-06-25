import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ItemOrderListItem from './ItemOrderListItem'
import { formatMoney, createKeyGenerator } from 'helpers/utils'
import clsx from 'clsx'

const genKey = createKeyGenerator()

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',

    '& ul': {
      borderBottom: theme.border.light,
    },
  },
  totalPrice: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: theme.spacing(2),
    paddingBottom: 0,

    '& span': {
      ...theme.typography.button,
      height: 'fit-content',
    },
  },
}))

function OrderList({ order, className }: { order: Order; className?: string }) {
  const classes = useStyles()

  const alreadyOrdered = !!order.orderedAt
  const totalPrice = order.reduce((sum, { price }) => sum + price, 0)

  return (
    <div className={clsx(classes.root, className)}>
      <ul>
        {order.map(itemOrder => (
          <ItemOrderListItem
            key={genKey()}
            itemOrder={itemOrder}
            alreadyOrdered={alreadyOrdered}
          />
        ))}
      </ul>

      <Typography variant="h6" component="p" className={classes.totalPrice}>
        <span>Total:</span>
        <div className="currency">{formatMoney(totalPrice)}</div>
      </Typography>
    </div>
  )
}

export default OrderList
