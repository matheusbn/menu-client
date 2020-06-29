import React from 'react'
import { Fade, Zoom, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import promptInstall from 'services/install'

const useStyles = makeStyles(theme => ({
  root: {
    // max material ui z-index is 1500
    zIndex: 2000,
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    height: '100vh',
    width: '100%',
    backgroundColor: props => props.noBackdrop || 'rgba(0, 0, 0, .5)',
    backdropFilter: 'blur(4px)',
  },
  loading: {
    margin: '0 auto',
    marginTop: '48vh',
    display: 'block',
  },
}))

export default function LoadingOverlay({
  loading,
  noBackdrop,
}: {
  loading: boolean
  noBackdrop?: boolean
}) {
  const classes = useStyles({ noBackdrop })

  return (
    <Fade timeout={500} in={loading} mountOnEnter unmountOnExit>
      <div className={classes.root}>
        <CircularProgress size={45} className={classes.loading} />
      </div>
    </Fade>
  )
}
