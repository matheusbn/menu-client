import React, { Component } from 'react';
import {
  Snackbar,
  Slide,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default class Toast extends Component {
  state = {
    isOpen: false
  }

  show = () => this.setState({isOpen: true})

  handleClose = (e, reason) => {
    if (reason === "timeout") this.setState({ isOpen: false })
  }

  render() {
    const {
      severity,
      message
    } = this.props;

    const snackbarProps = {
      open: this.state.isOpen,
      onClose: this.handleClose,
      autoHideDuration: 2000,
      TransitionComponent: SlideTransition
    }

    console.log(severity)
    if (severity) return (
      <Snackbar {...snackbarProps}>
        <Alert elevation={6} variant="filled" severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    )

    return <Snackbar message={message} {...snackbarProps} />
  }
}
