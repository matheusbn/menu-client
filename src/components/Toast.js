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

  handleClose = (e, reason) => {
    if (reason === "timeout") this.setState({ isOpen: false })
  }

  render() {
    return (
      <Snackbar
        open={this.state.isOpen}
        onClose={this.handleClose}
        autoHideDuration={2000}
      >
        <Alert severity="success">
          {this.props.message}
        </Alert>
      </Snackbar>
    );
  }
}
