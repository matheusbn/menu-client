import React from 'react'
import { ButtonBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import promptInstall from 'services/install'
import isFunction from 'lodash/isFunction'

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 90,
    position: 'fixed',
    bottom: 0,
    display: 'flex',
    width: '100%',
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

  const containerProps = {
    className: `${classes.root} ${className}`,
    style,
    onClick,
  }

  if (isFunction(onClick))
    return <ButtonBase {...containerProps}>{children}</ButtonBase>

  return (
    <>
      <div {...containerProps}>{children}</div>
    </>
  )
}
