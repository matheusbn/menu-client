import React, { useEffect, useRef, useState } from 'react'
// import { hot } from 'react-hot-loader/root';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import AppBar from 'components/AppBar'
import Home from 'pages/home'
import Menu from 'pages/menu'
import Auth from 'pages/auth'
import importFirebase, { getCurrentSession } from 'services/firebase'
import { Switch, history, Route, SlideRoute } from 'router'
import ToastContext from 'contexts/toast'
import GlobalStateProvider from 'src/GlobalStateProvider'
import Toast from 'components/Toast'

const colors = {
  primary: '#D55A00',
  secondary: '#071E22',
}

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    contrastThreshold: 3,
    tonalOffset: 0.15,
  },
  props: {
    MuiButton: {
      color: 'primary',
    },
  },
  overrides: {
    MuiInputBase: {
      input: {
        caretColor: colors.primary,
      },
    },
  },
  custom: {
    colors: {
      muted: '#696969',
    },
  },
})

const useStyles = makeStyles({
  loading: {
    margin: '0 auto',
    marginTop: '40%',
    display: 'block',
  },
})

function App() {
  const [loading, setLoading] = useState(true)
  const toast = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    importFirebase().then(firebase => {
      firebase.auth().onAuthStateChanged(async user => {
        if (!user) history.replace('/auth')
        else {
          const openSession = await getCurrentSession()
          // if (openSession) history.replace('/menu')
        }

        setLoading(false)
      })
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <ToastContext.Provider value={toast}>
          <CssBaseline />

          <AppBar />

          {loading ? (
            <CircularProgress size={50} className={classes.loading} />
          ) : (
            <Switch>
              <Route path="/auth" component={Auth} />
              <SlideRoute path="/menu" component={Menu} />
              <Route path="/" component={Home} />
            </Switch>
          )}
        </ToastContext.Provider>
        <Toast ref={toast} />
      </GlobalStateProvider>
    </ThemeProvider>
  )
}

// export default hot(App);
export default App
