import React, { useRef } from 'react';
// import { hot } from 'react-hot-loader/root';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "components/AppBar";
import Home from "pages/home";
import Auth from "pages/auth";
import { Switch, Route } from "router"
import ToastContext from 'src/toast-context'
import Toast from 'components/Toast'

const colors = {
  primary: "#D55A00",
  secondary: "#071E22",
}

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: colors.primary
    },
    secondary: {
      main: colors.secondary
    },
    contrastThreshold: 3,
    tonalOffset: 0.15
  },
  props: {
    MuiButton: {
      color: "primary"
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        caretColor: colors.primary,
      }
    }
  }
})

function App() {
  const toast = useRef(null)

  return (
    <ThemeProvider theme={theme}>
      <ToastContext.Provider value={toast}>
        <CssBaseline />

        <AppBar />

        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" component={Home} />
        </Switch>
      </ToastContext.Provider>

      <Toast ref={toast} />
    </ThemeProvider>
  );
}

// export default hot(App);
export default App;
