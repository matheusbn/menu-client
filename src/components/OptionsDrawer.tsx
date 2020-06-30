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
import MenuIcon from '@material-ui/icons/Menu'
import {
  ExitToApp as ExitToAppIcon,
  GetApp as GetAppIcon,
  PermIdentity as PermIdentityIcon,
} from '@material-ui/icons'
// import promptInstall from 'services/install'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
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
  console.log(open)

  const options = (
    <div className={classes.options} role="presentation" onClick={onClose}>
      <List>
        <ListItem button>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary={'Perfil'} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Sair'} />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary={'Instalar App'} />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Drawer anchor={'bottom'} open={open} onClose={onClose}>
      {options}
    </Drawer>
  )
}
