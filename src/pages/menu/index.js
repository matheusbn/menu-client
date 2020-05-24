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
import { Switch, history, Route, SlideRoute } from 'router'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'
import Item from './Item'
import ItemProfile from './ItemProfile'

const useStyles = makeStyles({
  root: {},
  itemsList: {},
})

const MenuSection = withStyles(theme => ({
  root: {
    borderBottom: '1px solid #0002',
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    '&:last-child': {
      border: 'none',
    },
  },
  sectionName: {
    display: 'block',
  },
}))(({ classes, section, onItemClick }) => (
  <div className={classes.root}>
    <Typography
      className={classes.sectionName}
      gutterBottom
      component="h1"
      variant="h6"
    >
      {capitalize(section.name)}
    </Typography>
    {section.items.map(item => (
      <Item item={item} onClick={() => onItemClick(item)} />
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
    items: items.filter(item => item.section.toLowerCase() === section),
  }))
}

function Menu() {
  const classes = useStyles()
  const [global, setGlobal] = useGlobalState()
  const [currentItem, setCurrentItem] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    if (global.currentRestaurant) {
      return Restaurant.subscribeMenu(global.currentRestaurant.id, setItems)
    }
  }, [global.currentRestaurant])

  useEffect(() => {
    if (items.length) {
      setCurrentItem(items.find(i => i.name === 'Classic Bacon'))
      history.push('/menu/item')
    }
  }, [items])

  const menu = getOrganizedSections(items)

  const handleItemClick = item => {
    setCurrentItem(item)
    history.push('/menu/item')
  }

  return (
    <>
      <Switch>
        <Route exact path="/menu">
          <AppBar hamburguer />

          <section className={classes.itemsList}>
            <div>
              {menu.map(section => (
                <MenuSection onItemClick={handleItemClick} section={section} />
              ))}
            </div>
          </section>
        </Route>
        <SlideRoute path="/menu/item">
          <ItemProfile item={currentItem} />
        </SlideRoute>
      </Switch>
    </>
  )
}

export default Menu
