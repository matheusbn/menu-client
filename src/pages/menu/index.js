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
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons'
import useGlobalState from 'hooks/useGlobalState'
import Restaurant from 'models/Restaurant'

import Item from './Item'

const useStyles = makeStyles({
  root: {},
  itemsList: {
    margin: 20,
  },
})

function Menu() {
  const classes = useStyles()
  const [state, setState] = useGlobalState()
  const [items, setItems] = useState([])

  useEffect(() => {
    console.log(state)
    Restaurant.subscribeMenu(state.currentRestaurant.id, setItems)
    // setItems([
    //   {
    //     name: 'Classic Burger',
    //     description: 'Pão de brioche com dois smash burgers e molho da casa',
    //     price: 18,
    //     pictures: ['https://i.imgur.com/Gi1onqz.jpg'],
    //   },
    // ])
  }, [])

  return (
    <section className={classes.itemsList}>
      <div>
        {items.map(item => (
          <Item item={item} />
        ))}
      </div>
    </section>
  )
}

export default Menu
