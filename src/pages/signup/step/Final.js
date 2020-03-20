import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

const Confirm = (props) => {

  const {
    values
  } = props;

  console.log(props)
  return (
    <div>
        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary={values.name} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Age" secondary={values.age} />
          </ListItem>
        </List>
    </div>
  );
}

export default Confirm;
