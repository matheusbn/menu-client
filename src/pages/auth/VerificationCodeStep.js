import React, { useEffect } from 'react';
import {
  FormControl,
  FilledInput,
  InputLabel,
  TextField,
  OutlinedInput,
  CircularProgress,
  Button,
  Typography
} from '@material-ui/core';

const VerificationCodeStep = (props) => {
  const handleVerificationCode = (e) => props.setVerificationCode(e.target.value)

  useEffect(() => {
    return props.onUnmount
  }, [])

  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Digite o código de acesso
        </Typography>
        <Typography variant="body2" align="center">
          Insira o código que enviamos para o seu celular: <span style={{fontWeight: 600}}>{props.phone}</span>
        </Typography>
      </div>
      <FormControl fullWidth variant="filled" className="phone-input">
        <TextField
          label="Código"
          value={props.verificationCode}
          onChange={handleVerificationCode}
          size="small"
          variant="outlined"
          style={{ maxWidth: 200, margin: "0 auto" }}
          inputProps={{
            style: {
              textAlign: "center"
            }
          }}
          autoFocus
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        className={"submit-button"}
      >
        Confirmar
      </Button>
    </form>
  )
}

export default VerificationCodeStep
