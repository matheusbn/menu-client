import React, { useEffect, useRef, useState } from 'react'
import { makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import Home from 'pages/home'
import Menu from 'pages/menu'
import Auth from 'pages/auth'
import Signup from 'pages/signup'
import StagingOrder from 'pages/stagingOrder'
import SessionCheckout from 'pages/sessionCheckout'
import ItemProfile from 'pages/itemProfile'
import NotFound from 'pages/NotFound'
import { Switch, history, Route, SlideRoute, Redirect } from 'router'
import ToastContext from 'contexts/toast'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeUserData } from 'actions'
import Toast from 'components/Toast'
import LoadingOverlay from 'components/LoadingOverlay'
import DesktopContainer from 'components/DesktopContainer'
import { createKeyGenerator } from 'helpers/utils'
import theme from './theme'
import pwaInstaller from 'services/pwaInstaller'

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
    state => !!state.restaurant?.currentSession
  )
  const isFetchingInitialData = useSelector(
    state => state.isFetchingInitialData
  )
  const toast = useRef(null)
  const classes = useStyles()

  useEffect(() => {
    console.log(theme)

    pwaInstaller.captureInstallEvent()
    dispatch(subscribeUserData())
  }, [])

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
  } else if (!user.displayName) {
    routes = [<SlideRoute key={keyGen()} path="/" component={Signup} />]
  } else if (hasOpenSession) {
    routes = [
      <SlideRoute
        direction="up"
        key={keyGen()}
        path="/pedido-atual"
        component={StagingOrder}
      />,
      <SlideRoute
        direction="up"
        key={keyGen()}
        path="/pedidos"
        component={SessionCheckout}
      />,
      <SlideRoute
        key={keyGen()}
        path="/menu/:itemId"
        component={ItemProfile}
      />,
      <SlideRoute key={keyGen()} path="/menu" component={Menu} />,
      <Route
        key={keyGen()}
        path="/"
        exact
        component={() => <Redirect to="/menu" />}
      />,
    ]
  } else
    routes = [
      <SlideRoute appear={false} key={keyGen()} path="/" component={Home} />,
    ]

  routes.push(<Route key="notfound" component={NotFound} />)

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={toast}>
        <CssBaseline />
        <DesktopContainer>
          <LoadingOverlay noBackdrop loading={isFetchingInitialData} />

          {!isFetchingInitialData && <Switch>{routes}</Switch>}
        </DesktopContainer>
      </ToastContext.Provider>
      <Toast ref={toast} />
    </ThemeProvider>
  )
}

export default App
