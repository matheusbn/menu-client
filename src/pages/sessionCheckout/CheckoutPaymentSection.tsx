import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  FormControl,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  Typography,
} from '@material-ui/core'
import MastercardSrc from 'assets/mastercard.png'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    paddingBottom: 0,
  },
  title: {
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(1),
    borderBottom: theme.border.light,
  },
  cardSelection: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',

    '& div:last-child': {
      ...theme.flex.center,
      '& button': {
        paddingRight: 0,
      },
    },
  },
  textCard: {
    ...theme.typography.button,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.secondary,
  },
  cardType: {
    marginTop: theme.spacing(2),
    width: '100%',
    '& .MuiFormControlLabel-root': {
      justifyContent: 'space-between',
      marginLeft: 0,
      '& .MuiFormControlLabel-label': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  },
}))

function CheckoutPaymentSection() {
  const classes = useStyles()
  const [cardType, setCardType] = useState('debit')
  // const session = useSelector(state => state.restaurant.currentSession)
  const dispatch = useDispatch()

  const handleCardType = e => setCardType(e.target.value)

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="p" className={classes.title}>
        Pagamento
      </Typography>

      <div className={classes.cardSelection}>
        <div>
          <Typography variant="h6" component="p">
            Cartão
          </Typography>
          <Typography variant="caption" className={classes.textCard}>
            MASTERCARD **** 9028
          </Typography>
        </div>
        <div>
          <Button color="primary">
            <img
              src={MastercardSrc}
              alt="Mastercard"
              style={{ marginRight: 8 }}
            />
            Trocar
          </Button>
        </div>
      </div>

      <FormControl component="fieldset" className={classes.cardType}>
        <RadioGroup
          aria-label="Método de pagamento"
          value={cardType}
          onChange={handleCardType}
        >
          <FormControlLabel
            labelPlacement="start"
            value="debit"
            control={<Radio />}
            label="Débito"
          />
          <FormControlLabel
            labelPlacement="start"
            value="credit"
            control={<Radio />}
            label="Crédito"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default CheckoutPaymentSection
