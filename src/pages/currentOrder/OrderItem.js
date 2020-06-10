import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
      borderBottom: '1px solid lightgray',
    },
  },
  itemName: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: theme.typography.fontWeightMedium,

    '& span': {
      fontSize: theme.typography.caption.fontSize,
    },
  },
  optional: {
    marginTop: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
  },
  option: {
    marginLeft: theme.spacing(1),

    display: 'flex',
    justifyContent: 'space-between',
  },
  optionals: {
    marginLeft: theme.spacing(1),
  },
  observations: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    '& span': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))

const Text = props => <Typography variant="body2" {...props} />

function OrderItem({ item }) {
  const classes = useStyles()
  const { amount, name, price, optionals, observations } = item

  return (
    <li className={classes.root}>
      <Text variant="body1" className={classes.itemName}>
        {amount}x {name} <div className="currency">{formatMoney(price)}</div>
      </Text>

      <div className={classes.optionals}>
        {Object.entries(optionals).map(([name, options]) => (
          <>
            <Text className={classes.optional}>{name}</Text>
            {options.map(option => (
              <Text className={classes.option}>
                - {option.name}
                <div className="currency">{formatMoney(option.price)}</div>
              </Text>
            ))}
          </>
        ))}
      </div>

      <Text className={classes.observations}>
        <span>Observação:</span> {observations}
      </Text>
    </li>
  )
}

export default OrderItem
