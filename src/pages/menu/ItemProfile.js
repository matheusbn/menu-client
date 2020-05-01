import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import AppBar from 'components/AppBar'
import {
  Send as SendIcon,
  CameraAlt as CameraAltIcon,
} from '@material-ui/icons'
import useGlobalState from 'hooks/useGlobalState'
import Restaurant from 'models/Restaurant'
import { getCurrentSession, getCurrentRestaurant } from 'services/firebase'
import capitalize from 'lodash/capitalize'

const useStyles = makeStyles({
  root: {},
  itemsList: {},
})

const MenuSection = withStyles({
  root: {
    borderBottom: '1px solid #0002',
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,

    '&:last-child': {
      border: 'none',
    },
  },
  sectionName: {
    paddingLeft: 5,
    paddingBottom: 8,
  },
})(({ classes, section }) => (
  <div className={classes.root}>
    <Typography
      className={classes.sectionName}
      gutterBottom
      component="body1"
      variant="h6"
    >
      {capitalize(section.name)}
    </Typography>
    {section.items.map(item => (
      <Item item={item} />
    ))}
  </div>
))

function ItemProfile(props) {
  const classes = useStyles()
  const [state, setState] = useGlobalState()

  return (
    <>
      <AppBar backButton />

      <section className={classes.itemsList}>
        <div>
          <h1>Item profile</h1>
          {/* {menu.map(section => (
            <MenuSection section={section} />
          ))} */}
        </div>
      </section>
    </>
  )
}

export default ItemProfile
