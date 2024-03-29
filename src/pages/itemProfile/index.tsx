import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import { Redirect, useParams, history } from 'router'
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons'
import useSetState from 'hooks/useSetState'
import { updateItemOrder, addItemOrder } from 'actions'
import { useSelector, useDispatch } from 'react-redux'
import OptionalRadio from './OptionalRadio'
import OptionalCheckbox from './OptionalCheckbox'
import BottomBar from 'components/BottomBar'
import { formatMoney } from 'helpers/utils'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
  itemProfile: {
    marginBottom: 50,
  },
  picture: {
    width: '100%',
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
    display: 'block',
  },
}))

function ItemProfile(props) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { itemId } = useParams()
  const itemOrder: ItemOrder = useSelector(state => state.selectedItemOrder)
  const item: MenuItem = useSelector(state =>
    state.menuItems.find(item => item.ref.id === itemId)
  )
  if (!item) return history.push('/menu')
  const opacityThreshold = useRef(null)
  const [selectedOptionals, setSelectedOptionals]: [
    SelectedOptionals,
    (object) => void
  ] = useSetState(itemOrder?.selectedOptionals ?? {})
  const [amount, setAmount] = useState(itemOrder?.amount || 1)
  const [totalPrice, setTotalPrice] = useState(item.price)
  const [observation, setObservation] = useState(itemOrder?.observation || '')
  const [missingRequiredFields, setMissingRequiredFields] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const calcPrice = () => {
      const totalPrice = Object.entries(selectedOptionals).reduce(
        (totalPrice, [optional, selectedOptions]) =>
          Array.isArray(selectedOptions)
            ? totalPrice +
              selectedOptions.reduce((sum, { price = 0 }) => sum + price, 0)
            : totalPrice + (selectedOptions.price || 0),
        0
      )

      return (totalPrice + item.data.price) * amount
    }

    setTotalPrice(calcPrice())
  }, [selectedOptionals, amount])

  // validate required fields
  useEffect(() => {
    if (!item?.data.optionals) return

    const isInvalid = item.data.optionals.some(optional => {
      const { min } = optional.required
      const value = selectedOptionals[optional.name]

      if (!min) return false
      if (!value || (Array.isArray(value) && value.length < min)) return true
    })

    setMissingRequiredFields(isInvalid)
  }, [selectedOptionals])

  const handleObservation = e => {
    if (observation.length < 140) setObservation(e.target.value)
  }

  const handleConfirm = () => {
    const newItem: ItemOrder = {
      item: {
        id: item.ref.id,
        name: item.data.name,
      },
      amount,
      selectedOptionals,
      observation,
      price: totalPrice,
    }

    dispatch(
      itemOrder ? updateItemOrder(itemOrder, newItem) : addItemOrder(newItem)
    )

    history.back()
  }

  if (isEmpty(item)) return <Redirect to="/menu" />
  return (
    <div className={classes.root}>
      <AppBar backButton opacityThreshold={opacityThreshold} />

      <section>
        <img src={item.data.pictures[0]} className={classes.picture} />

        <div className={classes.itemProfile}>
          <div style={{ margin: '5px 15px' }}>
            <Typography
              variant="h6"
              component="h1"
              ref={opacityThreshold}
              gutterBottom
            >
              {item.data.name}
            </Typography>
            <Typography className={classes.description}>
              {item.data.description}
            </Typography>
          </div>

          {(item.data.optionals || []).map(optional => {
            const isRadio = optional.required && optional.required.max === 1

            const inputProps = {
              optional,
              onChange: value =>
                setSelectedOptionals({ [optional.name]: value }),
            }
            if (isRadio)
              return (
                <OptionalRadio
                  {...inputProps}
                  value={selectedOptionals[optional.name]}
                />
              )

            return (
              <OptionalCheckbox
                {...inputProps}
                value={selectedOptionals[optional.name] || []}
              />
            )
          })}

          <hr />

          <div className={classes.observation}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="observation-input" variant="outlined">
                Observações
              </InputLabel>
              <OutlinedInput
                id="observation-input"
                value={observation}
                onChange={handleObservation}
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
          disabled={missingRequiredFields}
        >
          {itemOrder ? 'Atualizar' : 'Adicionar'}{' '}
          <span>R$ {formatMoney(totalPrice)}</span>
        </Button>
      </BottomBar>
    </div>
  )
}

export default ItemProfile
