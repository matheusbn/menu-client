import React from 'react'
import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import history from 'router/history'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    maxHeight: 102,
    maxWidth: '100%',
    marginBottom: 8,
  },
  img: {
    flex: 'none',
    width: 90,
    borderRadius: 2,
    height: 90,
    objectFit: 'cover',
    margin: 6,
  },
  itemInfo: {
    padding: '8px',
  },
  itemInfoCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10px',
  },
  title: {
    fontSize: '1rem',
    marginBottom: 4,
  },
  description: {
    color: theme.custom.colors.muted,
    maxWidth: '100%',
    maxHeight: '50%',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
  },
  price: {
    position: 'absolute',
    color: theme.custom.colors.muted,
    bottom: 4,
    right: 8,
    '& span': {
      fontSize: '0.7em',
    },
  },
}))

export default ({ item, onClick }) => {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.root} onClick={onClick}>
      <img src={item.pictures[0]} alt="Foto do prato" className={classes.img} />
      <div
        className={
          item.description ? classes.itemInfo : classes.itemInfoCentered
        }
      >
        <Typography className={classes.title} component="h3" variant="h6">
          {item.name}
        </Typography>
        {item.description ? (
          <Typography className={classes.description} variant="body2">
            {item.description}
          </Typography>
        ) : null}

        <div className={classes.price}>
          <span>R$</span> {formatMoney(item.price)}
        </div>
      </div>
    </Paper>
  )
}
