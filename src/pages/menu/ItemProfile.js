import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import { history } from 'router'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import useSetState from 'hooks/useSetState'
import { addOrderItems } from 'actions'
import { useDispatch } from 'react-redux'
import OptionalInput from './OptionalInput'
import BottomBar from 'components/BottomBar'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 50,
  },
  picture: {
    width: '100vw',
    height: '40vh',
  },
  description: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  },
  amount: {
    width: 100,
    height: 32,
    border: `2px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  bottomBar: {
    alignItems: 'center',
    padding: theme.spacing(1),
  },
  confirmButton: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  observation: {
    maxWidth: 600,
    padding: theme.spacing(2),
    margin: `0 auto`,
  },
}))

function ItemProfile({ item }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const opacityThreshold = useRef(null)
  const [state, setState] = useSetState({})
  const [amount, setAmount] = useState(1)
  const [totalPrice, setTotalPrice] = useState(item.price)
  const [observations, setObservations] = useState('')

  useEffect(() => {
    const calcPrice = () => {
      const totalPrice = Object.entries(state).reduce(
        (totalPrice, [optional, selectedOptions]) =>
          Array.isArray(selectedOptions)
            ? totalPrice +
              selectedOptions.reduce((sum, { price = 0 }) => sum + price, 0)
            : totalPrice + (selectedOptions.price || 0),
        0
      )

      return (totalPrice + item.price) * amount
    }

    setTotalPrice(calcPrice())
  }, [state, amount])

  const handleObservations = e => {
    if (observations.length < 140) setObservations(e.target.value)
  }

  const handleConfirm = () => {
    dispatch(
      addOrderItems({
        item: item.name,
        amount,
        optionals: state,
        observations,
        price: totalPrice,
      })
    )

    history.back()
  }

  return (
    <div>
      <AppBar backButton opacityThreshold={opacityThreshold} />

      <section className={classes.root}>
        <img src={item.pictures[0]} className={classes.picture} />

        <div className={classes.root}>
          <div style={{ margin: '5px 15px' }}>
            <Typography
              variant="h6"
              component="h1"
              ref={opacityThreshold}
              gutterBottom
            >
              {item.name}
            </Typography>
            <Typography className={classes.description}>
              {item.description}
            </Typography>
          </div>

          {(item.optionals || []).map(optional => (
            <OptionalInput
              optional={optional}
              value={state[optional.name]}
              onChange={value => setState({ [optional.name]: value })}
            />
          ))}

          <hr />

          <div className={classes.observation}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="observations-input" variant="outlined">
                Observações
              </InputLabel>
              <OutlinedInput
                id="observations-input"
                value={observations}
                onChange={handleObservations}
                label="Observações"
                multiline
                rows={3}
              />
              <FormHelperText>
                Ex: sem cebola, sem tomate, ponto da carne, etc.
              </FormHelperText>
            </FormControl>
          </div>
        </div>
      </section>

      <BottomBar className={classes.bottomBar}>
        <div className={classes.amount}>
          <IconButton
            onClick={() => setAmount(prev => prev - 1)}
            disabled={amount <= 1}
          >
            <RemoveIcon />
          </IconButton>
          {amount}
          <IconButton onClick={() => setAmount(prev => prev + 1)}>
            <AddIcon />
          </IconButton>
        </div>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={handleConfirm}
          className={classes.confirmButton}
        >
          Adicionar <span>R$ {formatMoney(totalPrice)}</span>
        </Button>
      </BottomBar>
    </div>
  )
}

export default ItemProfile
