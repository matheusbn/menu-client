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
import NotFound from 'pages/NotFound'
import { Switch, history, Route, SlideRoute, Redirect } from 'router'
import ToastContext from 'contexts/toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInitialData } from 'actions'
import useUpdateEffect from 'hooks/useUpdateEffect'
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
    marginTop: '40vh',
    display: 'block',
  },
})

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const session = useSelector(state => state.session)
  const isFetchingInitialData = useSelector(
    state => state.isFetchingInitialData
  )
  const toast = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    dispatch(fetchInitialData())
  }, [])

  useUpdateEffect(() => {
    if (!user) history.replace('/auth')
    else {
      if (session) history.replace('/menu')
      else history.replace('/')
    }
  }, [user, session])

  let routes = null
  if (!user) {
    routes = [
      <Route path="/auth" component={Auth} />,
      <Route path="/" exact component={() => <Redirect to="/menu" />} />,
    ]
  } else if (session) {
    routes = [
      <SlideRoute path="/menu" component={Menu} />,
      <SlideRoute
        direction="up"
        path="/menu/pedido-atual"
        component={() => <h1>pedido atual</h1>}
      />,
      <SlideRoute
        direction="up"
        path="/menu/fechar-conta"
        component={() => <h1>fechar conta</h1>}
      />,
      <Route path="/" exact component={() => <Redirect to="/menu" />} />,
    ]
  } else routes = [<Route path="/" component={Home} />]

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={toast}>
        <CssBaseline />

        {isFetchingInitialData ? (
          <CircularProgress size={50} className={classes.loading} />
        ) : (
          <Switch>
            {routes}
            <Route component={NotFound} />,
          </Switch>
        )}
      </ToastContext.Provider>
      <Toast ref={toast} />
    </ThemeProvider>
  )
}

// export default hot(App);
export default App
