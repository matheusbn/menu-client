import React from 'react';
// import { hot } from 'react-hot-loader/root';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from "components/AppBar";
import Home from "pages/home";
import Signup from "pages/signup";
import { Switch, Route } from "router"

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar />

      <Switch>
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </ThemeProvider>
  );
}

// export default hot(App);
export default App;
