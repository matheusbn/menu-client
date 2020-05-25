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
import BottomBar from 'components/BottomBar'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {},
  itemsList: {
    paddingTop: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    position: 'absolute',
    left: 0,
    top: '30vh',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    boxShadow: `0 -4px 18px #0008`,
  },
  itemsAmount: {
    height: 28,
    padding: theme.spacing(1) / 2,
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing(1),
  },
  currentOrderBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.primary.main,
    height: 40,
    padding: theme.spacing(1),
  },
  cover: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '40vh',
  },
}))

const MenuSection = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),

    '&:last-child': {
      border: 'none',
    },
  },
  sectionName: {
    display: 'block',
    borderBottom: '1px solid #0004',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    color: theme.palette.grey[700],
  },
}))(({ classes, section, onItemClick, addItems }) => (
  <div className={classes.root}>
    <Typography className={classes.sectionName} component="h2" variant="body2">
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
  const opacityThreshold = useRef(null)
  const [currentItem, setCurrentItem] = useState([])
  const [items, setItems] = useState([])
  const [currentOrder, setStagingOrder] = useState([])
  const { currentRestaurant } = global

  const addItems = items => setStagingOrder(prev => [...prev, items])

  useEffect(() => {
    if (global.currentRestaurant) {
      return Restaurant.subscribeMenu(global.currentRestaurant.id, setItems)
    }
  }, [global.currentRestaurant])

  useEffect(() => {
    // if (items.length) {
    //   setCurrentItem(items.find(i => i.name === 'Classic Bacon'))
    //   history.push('/menu/item')
    // }
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
          <AppBar hamburguer opacityThreshold={opacityThreshold} />

          <section className={classes.root}>
            <img
              src={global.currentRestaurant.coverPicture}
              className={classes.cover}
            />

            <div className={classes.itemsList} ref={opacityThreshold}>
              {menu.map(section => (
                <MenuSection onItemClick={handleItemClick} section={section} />
              ))}
            </div>
          </section>

          {currentOrder.length > 0 && (
            <BottomBar className={classes.currentOrderBar}>
              <div className={classes.itemsAmount}>{currentOrder.length}</div>
              Pedido atual
              <div>
                <span style={{ fontSize: '0.7rem' }}>R$ </span>
                {formatMoney(
                  currentOrder.reduce((sum, { price }) => sum + price, 0)
                )}
              </div>
            </BottomBar>
          )}
        </Route>
        <SlideRoute path="/menu/item">
          <ItemProfile item={currentItem} addItems={addItems} />
        </SlideRoute>
      </Switch>
    </>
  )
}

export default Menu
