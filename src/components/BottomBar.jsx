import React, { useState, useEffect, useRef } from 'react'
import { Button, Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import InstallIcon from 'assets/install.svg'
// import promptInstall from 'services/install'
import { Link, history } from 'router'
import importFirebase from 'services/firebase'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 90,
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    width: '100vw',
    height: props => props.height,
    boxShadow: `0px -1px 6px 1px #0005`,
    backgroundColor: theme.palette.background.default,
  },
}))

export default function BottomBar({ style, className, children, height = 50 }) {
  const classes = useStyles({ height })

  return (
    <>
      <div className={`${classes.root} ${className}`} style={style}>
        {children}
      </div>
      {/* prevents elements from disappearing behind the bar */}
      <div style={{ height }} />
    </>
  )
}
