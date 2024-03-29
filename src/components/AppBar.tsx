import React, { useState, useEffect, useRef } from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { history } from 'router'

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
  spacer: {
    height: BAR_HEIGHT,
    flex: 'none',
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
  const appBar = useRef(null)
  const [transparent, setTransparent] = useState(!!opacityThreshold)
  const classes = useStyles({ transparent })

  useEffect(() => {
    const thresholdEl = opacityThreshold && opacityThreshold.current
    if (thresholdEl) {
      const handler = () => {
        if (thresholdEl.getBoundingClientRect().top <= BAR_HEIGHT)
          setTransparent(false)
        else setTransparent(true)
      }

      window.addEventListener('scroll', handler, true)
      return () => window.removeEventListener('scroll', handler, true)
    }
  }, [opacityThreshold])

  return (
    <>
      <header ref={appBar} className={classes.root}>
        {backButton ? (
          <IconButton aria-label="go-back" onClick={() => history.back()}>
            <ArrowBackIcon className={classes.icon} />
          </IconButton>
        ) : (
          <div />
        )}

        <Typography className={classes.title} variant="body2">
          {title}
        </Typography>

        {hamburguer ? (
          <IconButton aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
        ) : null}
      </header>
      {/* prevents elements from disappearing behind the appbar */}
      {opacityThreshold ? null : <div className={classes.spacer} />}
    </>
  )
}
