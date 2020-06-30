import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import useQRCodeScanEffect from 'hooks/useQRCodeScanEffect'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

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

const UserProfileDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const classes = useStyles()

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      className={classes.root}
    >
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Perfil
          </Typography>
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* prevents elements from disappearing behind the appbar */}
      <List>
        <ListItem button>
          <ListItemText primary={'Nome'} secondary={'Matheus'} />
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button divider>
          {/* <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon> */}
          <ListItemText primary={'Sessões anteriores'} />
        </ListItem>
        <ListItem button>
          {/* <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon> */}
          <ListItemText primary={'Formas de pagamento'} />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default UserProfileDialog
