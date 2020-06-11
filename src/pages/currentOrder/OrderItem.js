import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Slide,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from '@material-ui/core'
import { removeOrderItem } from 'actions'
import { useDispatch } from 'react-redux'
import { formatMoney } from 'helpers/utils'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(1),
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
  observations: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    '& span': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
}))

const Text = props => <Typography variant="body2" {...props} />

function OrderItem({ item }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [present, setPresent] = useState(true)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const { amount, name, price, optionals, observations } = item
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = event => setMenuAnchorEl(event.currentTarget)

  const handleClose = () => setMenuAnchorEl(null)

  const handleEdit = () => setMenuAnchorEl(null)
  const handleRemove = () => {
    handleClose()
    setPresent(false)
    setTimeout(() => {
      dispatch(removeOrderItem(item))
    }, 300)
  }

  return (
    <Slide direction="left" appear={false} in={present} unmountOnExit>
      <li className={classes.root}>
        <Text variant="body1" className={classes.itemName}>
          {amount}x {name}
          <div className="right">
            <div className="currency">{formatMoney(price)}</div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={menuAnchorEl}
              keepMounted
              open={Boolean(menuAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEdit}>Editar</MenuItem>
              <MenuItem onClick={handleRemove}>Remover</MenuItem>
            </Menu>
          </div>
        </Text>

        <div className={classes.optionals}>
          {Object.entries(optionals).map(([name, options]) => (
            <>
              <Text className={classes.optional}>{name}</Text>
              {options.map(option => (
                <Text className={classes.option}>
                  - {option.name}
                  <div className="currency">{formatMoney(option.price)}</div>
                </Text>
              ))}
            </>
          ))}
        </div>

        <Text className={classes.observations}>
          <span>Observação:</span> {observations}
        </Text>
      </li>
    </Slide>
  )
}

export default OrderItem
