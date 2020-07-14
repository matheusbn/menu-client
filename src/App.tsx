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

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const hasOpenSession = useSelector(state => !!state.session)
  const isFetchingInitialData = useSelector(
    state => state.isFetchingInitialData
  )
  const toast = useRef(null)

  useEffect(() => {
    console.log(theme)
    try {
      pwaInstaller.captureInstallEvent()
      dispatch(subscribeUserData())
    } catch (e) {
      console.error(e)
    }
  }, [])

  let routes
  if (!user) {
    routes = [
      <Route key="/auth" path="/auth" component={Auth} />,
      <Route
        key="auth-redirect"
        path="/"
        exact
        component={() => <Redirect to="/auth" />}
      />,
    ]
  } else if (!user.displayName) {
    routes = [<SlideRoute key="signup" path="/" component={Signup} />]
  } else if (hasOpenSession) {
    routes = [
      <SlideRoute
        direction="up"
        key="/pedido-atual"
        path="/pedido-atual"
        component={StagingOrder}
      />,
      <SlideRoute
        direction="up"
        key="/pedidos"
        path="/pedidos"
        component={SessionCheckout}
      />,
      <SlideRoute
        key="/menu/:itemId"
        path="/menu/:itemId"
        component={ItemProfile}
      />,
      <SlideRoute key="/menu" path="/menu" component={Menu} />,
      <Route
        key="/"
        path="/"
        exact
        component={() => <Redirect to="/menu" />}
      />,
    ]
  } else {
    routes = [
      <SlideRoute appear={false} key="home" path="/" component={Home} />,
    ]
  }

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
