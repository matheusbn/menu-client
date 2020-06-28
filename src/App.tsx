// import 'preact/devtools'
import React, { useEffect, useRef, useState } from 'react'
// import { hot } from 'react-hot-loader/root';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'
import Home from 'pages/home'
import Menu from 'pages/menu'
import Auth from 'pages/auth'
import CurrentOrder from 'pages/currentOrder'
import Bill from 'pages/bill'
import ItemProfile from 'pages/itemProfile'
import NotFound from 'pages/NotFound'
import { Switch, history, Route, SlideRoute, Redirect } from 'router'
import ToastContext from 'contexts/toast'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeUserData } from 'actions'
import useUpdateEffect from 'hooks/useUpdateEffect'
import Toast from 'components/Toast'
import { createKeyGenerator } from 'helpers/utils'
import theme from './theme'

const keyGen = createKeyGenerator()

const useStyles = makeStyles({
  loading: {
    margin: '0 auto',
    marginTop: '40vh',
    display: 'block',
  },
})

function App() {
  const dispatch = useDispatch()
  const loaded = useRef(false)
  const user = useSelector(state => state.user)
  const hasOpenSession = useSelector(
    state => !!state.restaurant?.sessionSnapshot
  )
  const isFetchingInitialData = useSelector(
    state => state.isFetchingInitialData
  )
  const toast = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    console.log(theme)
    dispatch(subscribeUserData())
  }, [])

  useUpdateEffect(() => {
    // the initial route will be done declaratively by the redirect
    // components, so the first change on user state must be skipped
    if (loaded.current) {
      if (user) {
        if (hasOpenSession) history.replace('/menu')
        else history.replace('/')
      } else history.replace('/auth')
    }

    loaded.current = true
  }, [user, hasOpenSession, isFetchingInitialData])

  let routes

  if (!user) {
    routes = [
      <Route key={keyGen()} path="/auth" component={Auth} />,
      <Route
        key={keyGen()}
        path="/"
        exact
        component={() => <Redirect to="/auth" />}
      />,
    ]
  } else if (hasOpenSession) {
    routes = [
      <SlideRoute
        direction="up"
        key={keyGen()}
        path="/menu/pedido-atual"
        component={CurrentOrder}
      />,
      <SlideRoute
        direction="up"
        key={keyGen()}
        path="/menu/fechar-conta"
        component={Bill}
      />,
      <SlideRoute key={keyGen()} path="/menu/item" component={ItemProfile} />,
      <SlideRoute key={keyGen()} path="/menu" component={Menu} />,
      <Route
        key={keyGen()}
        path="/"
        exact
        component={() => <Redirect to="/menu" />}
      />,
    ]
  } else routes = [<Route key={keyGen()} path="/" component={Home} />]

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
