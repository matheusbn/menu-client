import React, { useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons'
import { history } from 'router'
import { useDispatch } from 'react-redux'
import { initSession as initSessionAction } from 'actions'
import QRScannerDialog from './QRScannerDialog'
import LoadingOverlay from 'components/LoadingOverlay'
import BottomBarWithOptions from 'components/BottomBarWithOptions'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  wrapper: {
    height: '100%',
    // display: 'flex',
  },
  titleSection: {
    width: '80%',
    height: '35%',
    ...theme.flex.center,
    flexDirection: 'column',
    margin: '0 auto',
    '& h1': {
      marginBottom: theme.spacing(4),
    },
  },
  actions: {
    width: '100%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: theme.spacing(2),
    '& .MuiButton-startIcon': {
      marginLeft: -theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  },
}))

const Divider = withStyles(theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    borderBottom: theme.border.light,
  },
}))(({ classes }) => <div className={classes.root} />)

function validateCode(code) {
  return /^[A-Z0-9]{5}$/gi.test(code)
}

function Home() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [code, setCode] = useState(null)
  const [codeError, setCodeError] = useState(null)
  const [loading, setLoading] = useState(false)
  const qrScanner = useRef(null)

  const handleCode = e => setCode(e.target.value.toUpperCase())

  const openQrScaner = () => qrScanner.current.open()

  const scanHandler = code => {
    if (validateCode(code)) {
      qrScanner.current.close()

      openSession(code)
    }
  }

  const inputButtonHandler = () => {
    if (!validateCode(code)) return setCodeError('Código não reconhecido')
    setCodeError(null)

    openSession(code)
  }

  const openSession = async code => {
    setLoading(true)
    dispatch(initSessionAction(code))
      .then(() => history.push('/menu'))
      .catch(error => {
        if (error.message === 'code not found')
          setCodeError('Não encontramos este código no sistema :(')

        console.error('Error finding code:', error)
      })
      .finally(() => setLoading(false))
  }

  return (
    <section className={classes.root}>
      <LoadingOverlay loading={loading} />

      <div className={classes.wrapper}>
        <div className={classes.titleSection}>
          <Typography variant="h4" component="h1" align="center">
            Bem-vindo!
          </Typography>
          <Typography variant="body2" align="center">
            Para começar, escaneie o QR Code ou insira o código de sua mesa.
          </Typography>
        </div>
        <div className={classes.actions}>
          <Button
            block
            variant="contained"
            onClick={openQrScaner}
            startIcon={<CameraAltIcon color="inherit" />}
            style={{ width: '100%' }}
          >
            Escanear QR Code
          </Button>

          {codeError ? (
            <Typography variant="caption" color="error" align="center">
              {codeError}
            </Typography>
          ) : (
            <Divider />
          )}

          <FormControl variant="outlined">
            <InputLabel htmlFor="code-input" variant="outlined">
              Código
            </InputLabel>
            <OutlinedInput
              id="code-input"
              value={code}
              onChange={handleCode}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    edge="end"
                    onClick={inputButtonHandler}
                  >
                    <SendIcon color="action" />
                  </IconButton>
                </InputAdornment>
              }
              label="Código"
              inputProps={{
                style: { textAlign: 'center' },
              }}
            />
            <FormHelperText>Procure pelo código em sua mesa</FormHelperText>
          </FormControl>
        </div>
      </div>

      <BottomBarWithOptions />
      <QRScannerDialog onScan={scanHandler} ref={qrScanner} />
    </section>
  )
}

export default Home
