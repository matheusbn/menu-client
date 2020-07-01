import React, { useRef, useState, useContext, useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import AppBar from 'components/AppBar'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
import BottomBar from 'components/BottomBar'
import OptionsDrawer from 'components/OptionsDrawer'

const useStyles = makeStyles(theme => ({
  navBottomBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.primary.main,
  },
}))

export default ({ leftElement }: { leftElement: React.ReactNode }) => {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }
  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  return (
    <>
      <BottomBar className={classes.navBottomBar}>
        {leftElement || <div></div>}
        <IconButton onClick={openDrawer}>
          <MoreVertIcon />
        </IconButton>
      </BottomBar>

      <OptionsDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </>
  )
}
