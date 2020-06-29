import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    ...theme.flex.center,
    backgroundColor: `${theme.palette.primary.main}10`,
  },
  box: {
    height: '90vh',
    position: 'fixed',
    top: '5vh',
    filter: 'opacity(1)',
    left: 'calc(50% - 250px)',
    width: 500,
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: theme.shadows[20],
    backgroundColor: theme.palette.background.default,
  },
  container: {
    position: 'absolute',
    top: '0',
    left: '0',
    overflowY: 'scroll',
    height: '100%',
    width: '100%',
  },
}))

function DesktopContainer({ children }) {
  // aspect ratio: width / height
  // wider than a 4/3 aspect ratio or bigger than 960px
  const matches = useMediaQuery('(min-aspect-ratio: 4/3), (min-width: 960px)')
  const classes = useStyles()

  if (matches)
    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <div className={classes.container}>{children}</div>
        </div>
      </div>
    )

  return children
}

export default DesktopContainer
