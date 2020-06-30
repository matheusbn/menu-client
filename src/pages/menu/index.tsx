import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  ButtonBase,
  IconButton,
  CircularProgress,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
  Receipt as ReceiptIcon,
  PermIdentity as PermIdentityIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'
import { history, Route, SlideRoute } from 'router'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMenuItems } from 'actions'
import capitalize from 'lodash/capitalize'
import Item from './Item'
import BottomBar from 'components/BottomBar'
import OptionsDrawer from 'components/OptionsDrawer'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
  },
  itemsList: {
    paddingTop: theme.spacing(1),
    paddingBottom: props =>
      props.emptyOrder ? BottomBar.HEIGHT : BottomBar.HEIGHT * 2,
    backgroundColor: theme.palette.background.default,
    top: '30vh',
    position: 'absolute',
    left: '0',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    boxShadow: `0 -4px 18px #0008`,
  },
  labelIconButton: {
    marginTop: theme.spacing(1) / 2,
    ...theme.flex.center,
    flexDirection: 'column',
    '& .MuiTypography-root': {
      fontSize: '0.68rem',
      color: theme.palette.grey[800],
    },
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
  stagingOrderBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.grey[200],
    backgroundColor: theme.palette.primary.main,
    bottom: BottomBar.HEIGHT,
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
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  cover: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
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
  const menuItems = useSelector(state => state.menuItems)
  const stagingItems: ItemOrder[] = useSelector(
    state => state.stagingOrder.items
  )
  const opacityThreshold = useRef(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const classes = useStyles({ emptyOrder: !stagingItems.length })

  const closeDrawer = () => {
    console.log('close')
    setIsDrawerOpen(false)
  }
  const openDrawer = () => {
    console.log('open')
    setIsDrawerOpen(true)
  }

  useEffect(() => {
    if (restaurant && !menuItems.length) dispatch(fetchMenuItems())
  }, [restaurant])

  const navToStagingOrder = () => history.push('/menu/pedido-atual')

  const menuSections = getOrganizedSections(menuItems)

  const handleItemClick = item => {
    history.push(`/menu/${item.id}`)
  }

  return (
    <div className={classes.root}>
      <AppBar
        title={
          <Typography variant="body1" component="h1">
            {restaurant?.name}
          </Typography>
        }
        opacityThreshold={opacityThreshold}
      />

      {!restaurant ? (
        <CircularProgress size={50} className={classes.loading} />
      ) : (
        <section>
          <img src={restaurant.coverPicture} className={classes.cover} />

          <div className={classes.itemsList} ref={opacityThreshold}>
            {menuSections.map(section => (
              <MenuSection onItemClick={handleItemClick} section={section} />
            ))}
          </div>
        </section>
      )}
      {stagingItems.length > 0 && (
        <BottomBar
          className={classes.stagingOrderBar}
          onClick={navToStagingOrder}
        >
          <div className={classes.itemsAmount}>{stagingItems.length}</div>
          <Typography variant="body1">Pedido atual</Typography>
          <div>
            <span style={{ fontSize: '0.7rem' }}>R$ </span>
            {formatMoney(
              stagingItems.reduce((sum, { price }) => sum + price, 0)
            )}
          </div>
        </BottomBar>
      )}
      <BottomBar className={classes.navBottomBar}>
        {/* <ButtonBase
          className={classes.labelIconButton}
          onClick={() => history.push('/fechar-conta')}
        >
          <ReceiptIcon />
          <Typography variant="caption">Pedidos</Typography>
        </ButtonBase>
        <ButtonBase className={classes.labelIconButton}>
          <MoreVertIcon />
          <Typography variant="caption">Opções</Typography>
        </ButtonBase> */}
        <IconButton onClick={() => history.push('/pedidos')}>
          <ReceiptIcon />
          <Typography variant="caption" style={{ marginLeft: 4 }}>
            Pedidos
          </Typography>
        </IconButton>
        <IconButton onClick={openDrawer}>
          <MoreVertIcon />
        </IconButton>
      </BottomBar>

      <OptionsDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </div>
  )
}

export default Menu
