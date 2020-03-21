import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  FilledInput,
  TextField,
  OutlinedInput,
  CircularProgress,
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
  const [countryCode, setCountryCode] = useState("+55")
  const [ddd, setDdd] = useState(null)
  const [phone, setPhone] = useState(null)

  const setValues = () => {
    setDdd("048")
    setPhone("991321617")
  }

  setValues()

  const handleCountryCode = (e) => setCountryCode(e.target.value)
  const handleDdd = (e) => setDdd(e.target.value)
  const handlePhone = (e) => setPhone(e.target.value)

  useEffect(() => {console.log('mounted')
    props.setPhone(countryCode + ddd + phone)
    return () => console.log("unmount")
  }, [countryCode, ddd, phone])

  return (
    <form>
      <div className={classes.root}>
        <TextField
          label="Pais"
          value={countryCode}
          onChange={handleCountryCode}
          onFocus={() => console.log(countryCode, ddd, phone)}
          size="small"
          margin="dense"
          variant="outlined"
        />

        <TextField
          label="DDD"
          value={ddd}
          onChange={handleDdd}
          size="small"
          margin="dense"
          variant="outlined"
        />

        <TextField
          label="Celular"
          value={phone}
          onChange={handlePhone}
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
        onClick={() => props.setLoading(true)}
        endIcon={props.loading && <CircularProgress color="white" size={20} />}
      >
        Confirm
      </Button>
    </form>
  )
}

export default PhoneStep
