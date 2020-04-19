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
import promptInstall from 'services/install'
import { Link } from 'router'
import importFirebase from 'services/firebase'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const installButton = useRef(null)

  useEffect(() => {
    promptInstall(installButton.current)
  }, [])

  const signOut = () => {
    importFirebase().then(firebase => firebase.auth().signOut())
    // importFirebase().then(firebase =>
    //   console.log("CURRENT USER:", firebase.auth().currentUser)
    // )
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todoz
          </Typography>
          <Button
            color="inherit"
            ref={installButton}
            style={{ display: 'none' }}
          >
            <InstallIcon />
          </Button>
          <Link to="/auth">
            <Button color="inherit">Entrar</Button>
          </Link>
          <Button color="inherit" onClick={signOut}>
            SAIR
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* prevents elements from disappearing behind the appbar */}
    </>
  )
}
