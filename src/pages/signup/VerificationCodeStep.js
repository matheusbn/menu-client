import React from 'react';
import {
  FormControl,
  FilledInput,
  InputLabel,
  Button,
} from '@material-ui/core';

const VerificationCodeStep = (props) => {
  const handleVerificationCode = (e) => props.setVerificationCode(e.target.value)

  return (
    <form style={{ marginTop: 50 }} onSubmit={props.onSubmit}>
      <FormControl fullWidth variant="filled">
        <InputLabel htmlFor="todo-input">Phone</InputLabel>
        <FilledInput
          id="todo-input"
          value={props.verificationCode}
          onChange={handleVerificationCode}
          size="small"
          variant="filled"
          autoComplete="off"
        />
      </FormControl>

      <Button
        type="submit"
        variant="contained"
      >
        Confirm
      </Button>
    </form>
  )
}

export default VerificationCodeStep
