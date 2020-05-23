import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InstallIcon from 'assets/install.svg'
// import promptInstall from 'services/install'
import { Link, history } from 'router'
import importFirebase from 'services/firebase'

const BAR_HEIGHT = 60

const useStyles = makeStyles(theme => ({
  root: {
    background: props =>
      props.transparent ? 'transparent' : theme.palette.background.default,
    transition: 'background 0.3s',
    zIndex: 90,
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100vw',
    height: BAR_HEIGHT,
    boxShadow: `0 -3px 6px 1px ${theme.palette.primary.main}`,
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    color: props => (props.transparent ? 'white' : theme.palette.primary.main),
    transition: 'color 0.3s',
  },
}))

export default function NavBar(props) {
  const { backButton, hamburguer, opacityThreshold } = props

  const installButton = useRef(null)
  const appBar = useRef(null)
  const thresholdEl = opacityThreshold && opacityThreshold.current
  const [transparent, setTransparent] = useState(opacityThreshold)
  const classes = useStyles({ transparent })

  useEffect(() => {
    // promptInstall(installButton.current)
  }, [])

  useEffect(() => {
    if (thresholdEl) {
      window.addEventListener('scroll', () => {
        if (thresholdEl.getBoundingClientRect().top <= BAR_HEIGHT)
          setTransparent(false)
        else setTransparent(true)
      })
    }
  }, [thresholdEl])

  const signOut = () => {
    importFirebase().then(firebase => firebase.auth().signOut())
  }

  return (
    <>
      <div ref={appBar} className={classes.root}>
        {backButton ? (
          <IconButton aria-label="go-back" onClick={() => history.back()}>
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        ) : (
          <Button className={classes.icon} onClick={signOut}>
            SAIR
          </Button>
        )}
        {hamburguer ? (
          <IconButton aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
        ) : null}
      </div>
      {/* prevents elements from disappearing behind the appbar */}
      {thresholdEl || <div style={{ height: BAR_HEIGHT }} />}
    </>
  )
}
