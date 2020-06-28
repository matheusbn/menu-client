import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { Typography, IconButton, CircularProgress } from '@material-ui/core'
import AppBar from 'components/AppBar'
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
  Receipt as ReceiptIcon,
  PermIdentity as PermIdentityIcon,
} from '@material-ui/icons'
import Restaurant from 'models/Restaurant'
import { Switch, history, Route, SlideRoute } from 'router'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedItemOrder } from 'actions'
import capitalize from 'lodash/capitalize'
import Item from './Item'
import BottomBar from 'components/BottomBar'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {},
  itemsList: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: props => (props.emptyOrder ? 50 : 100),
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
    bottom: 50,
    zIndex: 91,
    padding: theme.spacing(2),

    '& p': {
      // the right element is wider than the left elemnet,
      // and so the middle doesnt get properly aligned
      marginLeft: theme.spacing(2),
    },
  },
  navBottomBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.primary.main,
  },
  cover: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '40vh',
  },
  margin: '0 auto',
  marginTop: '35vh',
  display: 'block',
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
}))(({ classes, section, onItemClick }) => (
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
  const restaurant = useSelector(state => state.restaurant)
  const dispatch = useDispatch()
  const order = useSelector(state => state.order)
  const opacityThreshold = useRef(null)
  const [items, setItems] = useState([])
  const classes = useStyles({ emptyOrder: !order.length })

  useEffect(() => {
    if (restaurant) {
      return Restaurant.subscribeMenu(restaurant.id, setItems)
    }
  }, [restaurant])

  const navToCurrentOrder = () => history.push('/menu/pedido-atual')

  const menu = getOrganizedSections(items)

  const handleItemClick = item => {
    dispatch(setSelectedItemOrder({ item }))
    history.push('/menu/item')
  }

  return (
    <div>
      <AppBar
        title={
          <Typography variant="body1" component="h1">
            {(restaurant || {}).name}
          </Typography>
        }
        opacityThreshold={opacityThreshold}
      />

      {!restaurant ? (
        <CircularProgress size={50} className={classes.loading} />
      ) : (
        <>
          <section className={classes.root}>
            <img src={restaurant.coverPicture} className={classes.cover} />

            <div className={classes.itemsList} ref={opacityThreshold}>
              {menu.map(section => (
                <MenuSection onItemClick={handleItemClick} section={section} />
              ))}
            </div>
          </section>

          {order.length >= 0 && (
            <BottomBar
              className={classes.currentOrderBar}
              onClick={navToCurrentOrder}
            >
              <div className={classes.itemsAmount}>{order.length}</div>
              <Typography variant="body1">Pedido atual</Typography>
              <div>
                <span style={{ fontSize: '0.7rem' }}>R$ </span>
                {formatMoney(order.reduce((sum, { price }) => sum + price, 0))}
              </div>
            </BottomBar>
          )}
          <BottomBar className={classes.navBottomBar}>
            <IconButton onClick={() => history.push('/menu/fechar-conta')}>
              <ReceiptIcon />
            </IconButton>
            <IconButton>
              <PermIdentityIcon />
            </IconButton>
          </BottomBar>
        </>
      )}
    </div>
  )
}

export default Menu
