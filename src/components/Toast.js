import React, { Component } from 'react';
import {
  Snackbar,
  Slide,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default class Toast extends Component {
  state = {
    isOpen: false
  }

  show = () => this.setState({isOpen: true})

  handleClose = () => {
    setTimeout(() => this.setState({isOpen: false}), 2500)
  }

  render() {
    return (
      <Snackbar
        open={this.state.isOpen}
        onClose={this.handleClose}
        autoHideDuration={0}
      >
        <Alert severity="success">
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}
