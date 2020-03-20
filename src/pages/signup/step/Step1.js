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

function Step1(props) {
  const classes = useStyles()

  const handleNameChange = (e) => props.setValues({name: e.target.value})

  return (
    <div className={"step"}>
      <h1>Step - 1</h1>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="todo-input">Name</InputLabel>
          <FilledInput
            id="todo-input"
            value={props.values.name}
            onChange={handleNameChange}
            autoFocus
            size="small"
            variant="filled"
            autoComplete="off"
          />
        </FormControl>
    </div>
  );
}

export default Step1;
