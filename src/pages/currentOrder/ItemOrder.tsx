import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Slide,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core'
import { removeItemOrder } from 'actions'
import { history } from 'router'
import { setSelectedItemOrder } from 'actions'
import { useDispatch } from 'react-redux'
import { formatMoney } from 'helpers/utils'
import {
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(2),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
      borderBottom: '1px solid lightgray',
    },
  },
  itemName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: theme.typography.fontWeightMedium,

    '& .right': {
      display: 'flex',
      alignItems: 'center',
      '& .currency': {
        height: 'fit-content',
      },
      '& button': {
        margin: -theme.spacing(1),
        marginRight: -theme.spacing(2),
      },
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
  observation: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    '& span': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  menuItem: {
    width: 140,
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

const Text = props => <Typography variant="body2" {...props} />

function ItemOrder({ itemOrder }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [present, setPresent] = useState(true)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const { item, amount, price, optionals, observation } = itemOrder

  const openMenu = event => setMenuAnchorEl(event.currentTarget)
  const closeMenu = () => setMenuAnchorEl(null)

  const handleEdit = () => {
    dispatch(setSelectedItemOrder(itemOrder))
    history.push('/menu/item')
    setMenuAnchorEl(null)
  }
  const handleRemove = () => {
    closeMenu()
    setPresent(false)
    setTimeout(() => {
      dispatch(removeItemOrder(itemOrder))
    }, 300)
  }

  return (
    <Slide
      timeout={300}
      direction="left"
      appear={false}
      in={present}
      unmountOnExit
    >
      <li className={classes.root}>
        <Text variant="body1" className={classes.itemName}>
          {amount}x {item.name}
          <div className="right">
            <div className="currency">{formatMoney(price)}</div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={openMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={closeMenu}
            >
              <MenuItem onClick={handleEdit} className={classes.menuItem}>
                Editar
                <EditIcon />
              </MenuItem>
              <MenuItem onClick={handleRemove} className={classes.menuItem}>
                Remover
                <DeleteIcon />
              </MenuItem>
            </Menu>
          </div>
        </Text>

        <div className={classes.optionals}>
          {Object.entries(optionals).map(([name, options]) => {
            if (isEmpty(options)) return null

            return (
              <>
                <Text className={classes.optional}>{name}</Text>
                {(Array.isArray(options) ? options : [options]).map(option => (
                  <Text className={classes.option}>
                    - {option.name}
                    {option.price && (
                      <div className="currency">
                        {formatMoney(option.price)}
                      </div>
                    )}
                  </Text>
                ))}
              </>
            )
          })}
        </div>

        {observation && (
          <Text className={classes.observation}>
            <span>Observação:</span> {observation}
          </Text>
        )}
      </li>
    </Slide>
  )
}

export default ItemOrder
