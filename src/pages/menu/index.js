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
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons'
import useGlobalState from 'hooks/useGlobalState'
import Restaurant from 'models/Restaurant'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'

import Item from './Item'

const useStyles = makeStyles({
  root: {},
  itemsList: {},
})

const MenuSection = withStyles({
  root: {
    borderBottom: '1px solid #0002',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,

    '&:last-child': {
      border: 'none',
    },
  },
  sectionName: {
    paddingLeft: 5,
    paddingBottom: 8,
  },
})(({ classes, section }) => (
  <div className={classes.root}>
    <Typography className={classes.sectionName} component="body1" variant="h6">
      {capitalize(section.name)}
    </Typography>
    {section.items.map(item => (
      <Item item={item} />
    ))}
  </div>
))

const getDistinctSections = items =>
  items.reduce(
    (acc, { section }) =>
      !acc.includes(section.toLowerCase())
        ? [...acc, section.toLowerCase()]
        : acc,
    []
  )

const getOrganizedSections = items => {
  const sections = getDistinctSections(items)

  return sections.map(section => ({
    name: section,
    items: items.filter(item => item.section === section),
  }))
}

function Menu() {
  const classes = useStyles()
  const [state, setState] = useGlobalState()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (state.currentRestaurant) {
      return Restaurant.subscribeMenu(state.currentRestaurant.id, setItems)
    }
  }, [state.currentRestaurant])

  const menu = getOrganizedSections(items)

  return (
    <>
      <AppBar hamburguer />

      <section className={classes.itemsList}>
        <div>
          {menu.map(section => (
            <MenuSection section={section} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Menu
