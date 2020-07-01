import React, { useState, useEffect, useRef } from 'react'
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  ExitToApp as ExitToAppIcon,
  GetApp as GetAppIcon,
  PermIdentity as PermIdentityIcon,
} from '@material-ui/icons'
import importFirebase from 'services/firebase'
import pwaInstaller from 'services/pwaInstaller'
import UserProfileDialog from 'components/UserProfileDialog'

const useStyles = makeStyles({
  pwaInstall: {
    display: 'none',
  },
})

export default function OptionsDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const classes = useStyles()
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const installButton = useRef(null)

  const openUserDialog = () => setIsUserDialogOpen(true)
  const closeUserDialog = () => setIsUserDialogOpen(false)

  useEffect(() => {
    if (installButton.current) pwaInstaller.button = installButton.current
  }, [open])

  const signOut = () => {
    importFirebase().then(firebase => firebase.auth().signOut())
  }

  const options = (
    <div className={classes.options} role="presentation" onClick={onClose}>
      <List>
        <ListItem button onClick={openUserDialog}>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary={'Perfil'} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button onClick={signOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Sair'} />
        </ListItem>
        <ListItem button ref={installButton} className={classes.pwaInstall}>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Instalar App'} />
        </ListItem>
      </List>
    </div>
  )

  return (
    <>
      <Drawer anchor={'bottom'} open={open} onClose={onClose}>
        {options}
      </Drawer>
      <UserProfileDialog open={isUserDialogOpen} onClose={closeUserDialog} />
    </>
  )
}
