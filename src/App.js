// import 'preact/devtools'
import React, { useEffect, useRef, useState } from 'react'
// import { hot } from 'react-hot-loader/root';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import Home from 'pages/home'
import Menu from 'pages/menu'
import Auth from 'pages/auth'
import importFirebase, {
  getCurrentSession,
  getCurrentRestaurant,
} from 'services/firebase'
import { Switch, history, Route, SlideRoute } from 'router'
import ToastContext from 'contexts/toast'
import useSetState from 'hooks/useSetState'
import GlobalStateContext from 'contexts/global-state'
import SetGlobalStateContext from 'contexts/set-global-state'
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
    MuiIconButton: {
      color: 'primary',
    },
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
})

const useStyles = makeStyles({
  loading: {
    margin: '0 auto',
    marginTop: '40%',
    display: 'block',
  },
})

const defaultGlobalState = {
  currentUser: null,
  currentRestaurant: null,
  currentSession: null,
}

function App() {
  const [loading, setLoading] = useState(true)
  const [global, setGlobal] = useSetState(defaultGlobalState)
  const toast = useRef(null)
  const classes = useStyles()

  console.log(theme)

  useEffect(() => {
    importFirebase().then(firebase => {
      firebase.auth().onAuthStateChanged(async currentUser => {
        if (!currentUser) {
          history.replace('/auth')
          setLoading(false)
        } else {
          const currentSession = await getCurrentSession()
          if (currentSession) {
            history.push('/menu')
            const currentRestaurant = await getCurrentRestaurant()

            setGlobal({
              currentUser,
              currentSession,
              currentRestaurant,
            })
          } else {
            history.push('/')
            setGlobal({ currentUser })
          }
          setLoading(false)
        }
      })
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateContext.Provider value={global}>
        <SetGlobalStateContext.Provider value={setGlobal}>
          <ToastContext.Provider value={toast}>
            <CssBaseline />

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
        </SetGlobalStateContext.Provider>
      </GlobalStateContext.Provider>
    </ThemeProvider>
  )
}

// export default hot(App);
export default App
