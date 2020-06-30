import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CircularProgress,
  Button,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 3fr',
    gridGap: '10px',
  },
})

const PhoneStep = props => {
  const classes = useStyles()
  const [countryCode, setCountryCode] = useState('+55')
  const [ddd, setDdd] = useState('048')
  const [phone, setPhone] = useState('')

  const handleCountryCode = e => setCountryCode(e.target.value)
  const handleDdd = e => setDdd(e.target.value)
  const handlePhone = e => setPhone(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    console.log('submitted')
    props.onSubmit()
  }

  useEffect(() => {
    const dirty = countryCode + ddd + phone
    props.setPhone(dirty.replace(/[\s-]/g, ''))
  }, [countryCode, ddd, phone])

  return (
    <form>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        color="primary"
        className="title"
      >
        MENU
      </Typography>
      <div className="instructions">
        <Typography variant="h5" component="h2" align="center" gutterBottom>
          Acesse ou crie sua conta
        </Typography>
        <Typography variant="body2" align="center">
          Você receberá um código de acesso por SMS. <br />
          Seus dados ficarão seguros e não é necessário lembrar de uma senha :)
        </Typography>
      </div>

      <div className="phone-input">
        <div className={classes.root}>
          <TextField
            label="Pais"
            value={countryCode}
            onChange={handleCountryCode}
            size="small"
            margin="dense"
            variant="outlined"
            error={props.error}
          />

          <TextField
            label="DDD"
            value={ddd}
            onChange={handleDdd}
            size="small"
            margin="dense"
            variant="outlined"
            error={props.error}
          />

          <TextField
            label="Celular"
            value={phone}
            onChange={handlePhone}
            size="small"
            margin="dense"
            variant="outlined"
            error={props.error}
            helperText={props.error && 'Digite um número válido'}
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="contained"
        id="sign-in-button"
        className={'submit-button'}
        onClick={() => props.setLoading(true)}
        endIcon={props.loading && <CircularProgress color="white" size={20} />}
      >
        Confirmar
      </Button>
    </form>
  )
}

export default PhoneStep
