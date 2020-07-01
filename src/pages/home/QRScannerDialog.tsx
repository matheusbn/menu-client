import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import useQRCodeScanEffect from 'hooks/useQRCodeScanEffect'
import {
  Button,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import adapter from 'webrtc-adapter'

const useStyles = makeStyles(theme => ({
  root: {
    '& video': {
      width: '100%',
      height: '100%',
      objectFit: 'fill',
    },
  },
  codeOverlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .code-box': {
      position: 'relative',
      width: '80%',
      maxHeight: '80%',

      // Height equal to dynamic width: https://stackoverflow.com/questions/5445491/height-equal-to-dynamic-width-css-fluid-layout
      '& .dummy': {
        marginTop: '100%',
      },

      '&:after': {
        content: '""',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: '10px',
        boxShadow: '0px 0px 0px 1500px rgba(0, 0, 0, 0.4)',
      },
    },
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const QRScannerDialog = ({ onScan }: (string) => void, ref) => {
  const classes = useStyles()
  const dialogRef = useRef(null)
  const [open, setOpen] = useState(false)
  const videoRef = useRef(null)

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(close),
  }))

  useEffect(() => {
    if (!open) return

    const constraints = {
      audio: false,
      video: {
        facingMode: 'environment',
        // width: 720,
        // height: 720,
      },
    }

    videoRef.current.setAttribute('autoplay', '')
    videoRef.current.setAttribute('muted', '')
    videoRef.current.setAttribute('playsinline', '')

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      })
      .catch(error =>
        console.error('Error getting user media (opening camera):', error)
      )

    return () => {
      if (!videoRef.current.srcObject) return

      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach(track => track.stop())
    }
  }, [open])

  useQRCodeScanEffect(videoRef, onScan, [open])

  const handleClose = () => setOpen(false)

  return (
    <Dialog
      ref={dialogRef}
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      className={classes.root}
    >
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Escanear QR Code
          </Typography>
          <IconButton edge="end" onClick={handleClose} aria-label="close">
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* prevents elements from disappearing behind the appbar */}
      <video ref={videoRef}>Video stream not available.</video>
      <div className={classes.codeOverlay}>
        <div className="code-box">
          <div className="dummy"></div>
        </div>
      </div>
    </Dialog>
  )
}

export default React.forwardRef(QRScannerDialog)
