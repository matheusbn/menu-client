import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useSetState from '../../hooks/useSetState'
import {
  IconButton,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Button,
} from '@material-ui/core';
import Step1 from './Step1'
import Step2 from './Step2'
import Confirm from './Final'

const useStyles = makeStyles({
  root: {
    "--width": "400px",
    height: "80vh",
    width: "100%",
    maxWidth: "400px",//"var(--width)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    '& input': {
      width: "var(--width)"
    },
    '& .step-form-buttons': {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "40px",
      width: "var(--width)"
    }
  }
});

function Signup() {
  const classes = useStyles()
  const [step, setStep] = useState(1)
  const [values, setValues] = useSetState({
    name: null,
    age: null
  })

  const prev = () => setStep(prev => prev > 1 ? prev-1 : 1)
  const next = () => setStep(prev => prev+1)

  const selectStep = () => {
    const stepProps = {
      values,
      setValues,
      next,
      prev,
    }

    if (step === 1) return <Step1 {...stepProps} />
    if (step === 2) return <Step2 {...stepProps} />
    if (step > 2) return <Confirm {...stepProps} />
  }

  return (
    <section className={classes.root}>
      <form>
        { selectStep() }
      </form>

      <div className="step-form-buttons">
        {step > 1 && <Button onClick={prev}>Back</Button>}
        <Button variant="contained" onClick={next}>Continue</Button>
      </div>
    </section>
  );
}

export default Signup;
