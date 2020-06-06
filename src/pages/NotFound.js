import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#ff6c0017',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    width: 120,
    margin: 10,
  },
}))

const NotFound = props => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Typography variant="h2" component="h1" color="primary">
        404
      </Typography>
      <div className={classes.divider}></div>
      <Typography variant="h5" component="body1" color="primary">
        Esta página não existe :(
      </Typography>
    </section>
  )
}

export default NotFound
