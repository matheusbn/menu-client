import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  Button,
} from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons'

const useStyles = makeStyles({
  root: {
  }
});

function Step2(props) {
  const classes = useStyles()

  const handleAgeChange = (e) => props.setValues({age: e.target.value})

  return (
    <div className={classes.root}>
      <h1>Step - 2</h1>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="todo-input">Age</InputLabel>
          <FilledInput
            id="todo-input"
            value={props.values.age}
            onChange={handleAgeChange}
            autoFocus
            size="small"
            variant="filled"
            autoComplete="off"
          />
        </FormControl>
    </div>
  );
}

export default Step2;
