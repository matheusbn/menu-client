import React, { useRef, useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons';
import useToast from 'hooks/useToast'
import Restaurant from 'models/Restaurant'

const useStyles = makeStyles({
  root: {
  },
})

function Menu() {
  const classes = useStyles()
  const [code, setCode] = useState(null)
  const showToast = useToast()


  return (
    <section className={classes.root}>
      <h1>Menu</h1>
    </section>
  );
}

export default Menu;
