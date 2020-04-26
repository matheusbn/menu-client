import React, { useEffect, useRef } from 'react'
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import InstallIcon from 'assets/install.svg'
// import promptInstall from 'services/install'
import { Link } from 'router'
import importFirebase from 'services/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    // background: 'transparent',
  },
  menuButton: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    flexGrow: 1,
  },
}))

export default function NavBar(props) {
  const classes = useStyles()
  const installButton = useRef(null)

  useEffect(() => {
    // promptInstall(installButton.current)
  }, [])

  const signOut = () => {
    importFirebase().then(firebase => firebase.auth().signOut())
  }

  return (
    <>
      <AppBar className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Button color="inherit" onClick={signOut}>
              SAIR
            </Button>
          </div>
          {props.hamburguer ? (
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          ) : null}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* prevents elements from disappearing behind the appbar */}
    </>
  )
}
