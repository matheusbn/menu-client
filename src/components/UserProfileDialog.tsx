import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
import { Close as CloseIcon, Edit as EditIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
          <ListItemText
            primary={'Formas de pagamento'}
            secondary={'MASTERCARD **** 9028'}
          />
        </ListItem>
      </List>
    </Dialog>
  )
}

export default UserProfileDialog
