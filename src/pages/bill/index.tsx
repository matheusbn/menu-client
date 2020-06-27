import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import OrderList from 'components/OrderList'
import AppBar from 'components/AppBar'
import BottomBar from 'components/BottomBar'
import BillPaymentSection from './BillPaymentSection'
import { addOrder } from 'actions'
import { useSelector, useDispatch } from 'react-redux'
import { formatMoney, createKeyGenerator } from 'helpers/utils'

const genKey = createKeyGenerator()

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 60,
  },
  orderList: {
    padding: theme.spacing(2),
    borderBottom: theme.border.light,
    borderBottomWidth: 2,
  },
  orderTitle: {
    ...theme.typography.body1,
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    textAlign: 'center',
    // marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  bottomBar: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  totalPrice: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    margin: theme.spacing(2),
    marginTop: theme.spacing(4),

    '& span': {
      ...theme.typography.button,
      height: 'fit-content',
    },
  },
  divider: {
    height: 25,
    backgroundColor: theme.palette.divider,
  },
}))

function compareAsc(e1, e2) {
  if (e1 < e2) return -1
  if (e1 > e2) return 1

  return 0
}

function Bill(props) {
  const classes = useStyles()
  const bill: Order[] = useSelector(state => state.bill)
  const dispatch = useDispatch(null)

  const handleConfirm = () => {
    // dispatch(addOrder(order))
    history.back()
  }

  const totalPrice = bill.reduce(
    (sum, order) =>
      sum + order.reduce((orderSum, { price }) => orderSum + price, 0),
    0
  )

  return (
    <div className={classes.root}>
      <AppBar
        backButton
        title={
          <Typography variant="button" component="h1">
            Fechar Conta
          </Typography>
        }
      />

      <section className={classes.section}>
        {bill
          .slice()
          .sort(compareAsc)
          .map((order, i) => (
            <>
              <Typography className={classes.orderTitle}>
                Pedido {i < 10 && '0' + (i + 1)}
              </Typography>
              <OrderList
                key={genKey()}
                order={order}
                className={classes.orderList}
              />
            </>
          ))}

        {/* {!!order.length && <hr style={{ margin: 0 }} />} */}

        <Typography variant="h5" component="p" className={classes.totalPrice}>
          <span>Total conta:</span>
          <div className="currency">{formatMoney(totalPrice)}</div>
        </Typography>

        <div className={classes.divider} />

        <BillPaymentSection bill={bill} />
      </section>

      <BottomBar className={classes.bottomBar}>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleConfirm}
        >
          Realizar pagamento
        </Button>
      </BottomBar>
    </div>
  )
}

export default Bill
