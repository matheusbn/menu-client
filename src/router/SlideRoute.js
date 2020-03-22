import React from 'react'
import { Route } from "router"
import { Slide } from '@material-ui/core'

export default function SlideRoute({direction, ...props}) {
  return (
    <Slide
      direction={direction || "left"}
      in={true}
      mountOnEnter
      unmountOnExit
    >
      <Route {...props} />
    </Slide>
  )
}
