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
    background: (props: { transparent: boolean }) =>
      props.transparent ? 'transparent' : theme.palette.background.default,
    transition: 'background 0.3s',
    zIndex: 90,
    position: 'fixed',
    top: 0,
    display: 'grid',
    gridTemplateColumns: '50px 1fr 50px',
    width: '100%',
    height: BAR_HEIGHT,
    boxShadow: props =>
      props.transparent ? 'none' : `0 -3px 6px 1px ${theme.palette.grey[700]}`,
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: props => (props.transparent ? 'white' : theme.palette.primary.main),
  },
  icon: {
    color: props => (props.transparent ? 'white' : theme.palette.primary.main),
    transition: 'color 0.3s',
  },
}))

export default function NavBar({
  title,
  backButton,
  hamburguer,
  opacityThreshold,
}: {
  style?: object
  className?: string

  title: string
  backButton: boolean
  hamburguer: boolean
  opacityThreshold: React.Ref<HTMLElement>
}) {
  const installButton = useRef(null)
  const appBar = useRef(null)
  const [transparent, setTransparent] = useState(!!opacityThreshold)
  const classes = useStyles({ transparent })

  useEffect(() => {
    // promptInstall(installButton.current)
  }, [])

  useEffect(() => {
    const thresholdEl = opacityThreshold && opacityThreshold.current

    if (thresholdEl) {
      const handler = () => {
        if (thresholdEl.getBoundingClientRect().top <= BAR_HEIGHT)
          setTransparent(false)
        else setTransparent(true)
      }

      window.addEventListener('scroll', handler)
      return () => window.removeEventListener('scroll', handler)
    }
  }, [opacityThreshold])

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

        <div className={classes.title}>{title}</div>

        {hamburguer ? (
          <IconButton aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
        ) : null}
      </div>
      {/* prevents elements from disappearing behind the appbar */}
      {opacityThreshold ? null : <div style={{ height: BAR_HEIGHT }} />}
    </>
  )
}
