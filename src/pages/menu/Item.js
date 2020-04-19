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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    paddinRight: 20,
    maxHeight: 92,
  },
  img: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    margin: 6,
  },
  itemInfo: {
    padding: '8px',
  },
  title: {
    fontSize: '1rem',
  },
  description: {
    color: theme.custom.colors.muted,
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

export default ({ item }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <img src={item.pictures[0]} alt="Foto do prato" className={classes.img} />
      <div className={classes.itemInfo}>
        <Typography
          className={classes.title}
          component="h3"
          variant="h6"
          gutterBottom
        >
          {item.name}
        </Typography>
        <Typography className={classes.description} variant="body2">
          {item.description}
        </Typography>

        <div className={classes.price}>
          <span>R$</span> {item.price}
        </div>
      </div>
    </Paper>
  )
}
