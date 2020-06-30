import React from 'react'
import { Paper, Typography, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { formatMoney } from 'helpers/utils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
    maxHeight: 102,
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiListItem-root': {
      padding: 0,
    },
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
    height: '100%',
  },
  itemInfoCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '10px',
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 4,
  },
  description: {
    color: theme.palette.text.secondary,
    maxWidth: '100%',
    maxHeight: '50%',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    overflow: 'hidden',
  },
  price: {
    position: 'absolute',
    color: theme.palette.text.secondary,
    bottom: 4,
    right: 8,
    '& span': {
      fontSize: '0.7rem',
    },
  },
}))

export default ({ item, onClick }) => {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.root}>
      <ListItem button onClick={onClick} disableGutters>
        <img
          src={item.pictures[0]}
          alt="Foto do prato"
          className={classes.img}
        />
        <div
          className={
            item.description ? classes.itemInfo : classes.itemInfoCentered
          }
        >
          <Typography className={classes.title} component="h2" variant="body1">
            {item.name}
          </Typography>
          {item.description ? (
            <Typography className={classes.description} variant="body2">
              {item.description}
            </Typography>
          ) : null}

          <div className={classes.price}>
            <span>R$ </span>
            {formatMoney(item.price)}
          </div>
        </div>
      </ListItem>
    </Paper>
  )
}
