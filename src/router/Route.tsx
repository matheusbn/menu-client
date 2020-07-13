import React, { ComponentType } from 'react'

interface RouteProps {
  path?: string
  exact?: boolean
  component?: React.ComponentType
  children?: React.ReactChildren
}

export default function Route(props) {
  if (props.component) return <props.component />
  return props.children
}
