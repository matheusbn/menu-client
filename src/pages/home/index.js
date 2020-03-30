import React, { useRef, useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Todo from "models/Todo"
import useToast from 'hooks/useToast'
import QRScannerDialog from './QRScannerDialog'

const useStyles = makeStyles({
  root: {
    height: "80vh",
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
    display: "grid",
    padding: "20px",

    "& .home-title": {
      width: "80%",
      margin: "0 auto",
      marginBottom: "50px",
      "& h1": {
        marginBottom: "40px",
      }
    },
    "& .home-actions": {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& .MuiButton-startIcon": {
        marginLeft: "-20px",
        marginRight: "20px",
      }
    },
  },
  loading: {
    marginTop: "20vh"
  }
})

const Divider = withStyles({
  root: {
    width: "60%",
    margin: "0 auto",
    borderBottom: "1px solid lightgray",

  }
})(({classes}) => (
  <div className={classes.root} />
))

function Home() {
  const classes = useStyles()
  const [code, setCode] = useState(null)
  const showToast = useToast()
  const qrScanner = useRef(null)

  const handleCode = (e) => setCode(e.target.value)

  const handleQrScaner = () => {
    qrScanner.current.open()
  }

  return (
    <section className={classes.root}>
      <div className="home-title">
        <Typography variant="h4" component="h1" align="center">
          FALA TU CI!
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
          style={{ width: "100%" }}
        >
          Escanear QR Code
        </Button>

        <Divider />

        <TextField
          label="Código"
          value={code}
          onChange={handleCode}
          variant="outlined"
          inputProps={{
            style: {
              textAlign: "center"
            }
          }}
        />
      </div>

      <QRScannerDialog ref={qrScanner} />
    </section>
  );
}

export default Home;
