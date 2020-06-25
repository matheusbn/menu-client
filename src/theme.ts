import { createMuiTheme } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    border: {
      light: string
    }
    flex: {
      center: object
    }
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    border?: {
      light?: string
    }
    flex?: {
      center?: object
    }
  }
}

const colors = {
  // #c81732 vermelho
  primary: '#D55A00',
  secondary: '#071E22',
}

const theme = createMuiTheme({
  palette: {
    type: 'light',
    divider: 'rgba(0, 0, 0, 0.10)',
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
    MuiSvgIcon: {
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
  border: {
    light: '1px solid rgba(0, 0, 0, 0.10)',
  },
  flex: {
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
})

export default theme
