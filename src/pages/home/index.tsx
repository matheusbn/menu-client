import React, { useRef, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
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
import { openSession } from 'actions'
import QRScannerDialog from './QRScannerDialog'

const useStyles = makeStyles({
  root: {
    height: '80vh',
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    display: 'grid',
    padding: '20px',

    '& .home-title': {
      width: '80%',
      margin: '0 auto',
      marginBottom: '50px',
      '& h1': {
        marginBottom: '40px',
      },
    },
    '& .home-actions': {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& .MuiButton-startIcon': {
        marginLeft: '-20px',
        marginRight: '20px',
      },
    },
  },
  loading: {
    marginTop: '20vh',
  },
})

const Divider = withStyles(theme => ({
  root: {
    width: '60%',
    margin: '0 auto',
    borderBottom: theme.border.light,
  },
}))(({ classes }) => <div className={classes.root} />)

function Home() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [code, setCode] = useState(null)
  const qrScanner = useRef(null)

  const handleCode = e => setCode(e.target.value.toUpperCase())

  const handleQrScaner = () => qrScanner.current.open()

  const handleOpenSession = async () => dispatch(openSession(code))

  return (
    <section className={classes.root}>
      <div className="home-title">
        <Typography variant="h4" component="h1" align="center">
          Bem-vindo!
        </Typography>
        <Typography variant="body2" align="center">
          Para começar, escaneie o QR Code ou insira o código de sua mesa.
        </Typography>
      </div>
      <div className="home-actions">
        <Button
          block
          variant="contained"
          onClick={handleQrScaner}
          startIcon={<CameraAltIcon />}
          style={{ width: '100%' }}
        >
          Escanear QR Code
        </Button>

        <Divider />

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
                  onClick={handleOpenSession}
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

      <QRScannerDialog ref={qrScanner} />
    </section>
  )
}

export default Home
