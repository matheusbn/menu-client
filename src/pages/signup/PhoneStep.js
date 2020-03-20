import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FilledInput,
  TextField,
  OutlinedInput,
  InputLabel,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns:  "1fr 1fr 3fr",
    gridGap: "10px"
  }
})


const PhoneStep = (props) => {
  const classes = useStyles()
  const [countryCode, setCountryCode] = useState(null)
  const [ddd, setDdd] = useState(null)
  const [phone, setPhone] = useState(null)

  const handleCountryCode = (e) => setCountryCode(e.target.value)
  const handleDdd = (e) => setDdd(e.target.value)
  const handlePhone = (e) => setPhone(e.target.value)

  useEffect(() => {
    props.setPhone(countryCode + ddd + phone)
  }, [countryCode, ddd, phone])

  return (
    <form>
      <div className={classes.root}>
        <TextField
          label="Pais"
          value={countryCode}
          onChange={handleCountryCode}
          autoFocus
          size="small"
          margin="dense"
          variant="outlined"
        />

        <TextField
          label="DDD"
          value={ddd}
          onChange={handleDdd}
          autoFocus
          size="small"
          margin="dense"
          variant="outlined"
        />

        <TextField
          label="Celular"
          value={phone}
          onChange={handlePhone}
          autoFocus
          size="small"
          margin="dense"
          variant="outlined"
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        id="sign-in-button"
        className={"submit-button"}
        // disabled={!captchaVerified || !isPhoneValid(phone)}
      >
        Confirm
      </Button>
    </form>
  )
}

export default PhoneStep
