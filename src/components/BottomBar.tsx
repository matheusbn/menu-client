import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import promptInstall from 'services/install'
import { Link, history } from 'router'

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

export default function BottomBar({
  style,
  className,
  children,
  height = 50,
  onClick,
}: {
  style?: object
  className?: string
  children?: React.ReactNode
  height?: number
  onClick?: () => void
}) {
  const classes = useStyles({ height })

  return (
    <>
      <div
        className={`${classes.root} ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  )
}
