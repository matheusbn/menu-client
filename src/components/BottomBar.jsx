import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InstallIcon from 'assets/install.svg'
// import promptInstall from 'services/install'
import { Link, history } from 'router'
import importFirebase from 'services/firebase'

const BAR_HEIGHT = 50

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 90,
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    width: '100vw',
    height: BAR_HEIGHT,
    boxShadow: `0 -2px 8px 1px ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.background.default,
  },
}))

export default function BottomBar({ style, className, children }) {
  const classes = useStyles()

  return (
    <>
      <div className={`${classes.root} ${className}`} style={style}>
        {children}
      </div>
      {/* prevents elements from disappearing behind the bar */}
      <div style={{ height: BAR_HEIGHT }} />
    </>
  )
}
