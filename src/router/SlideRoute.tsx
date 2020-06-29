import React from 'react'
import { Route } from 'router'
import { Slide } from '@material-ui/core'

/**
 * attention with absolute or fixed positioned elements
 */
export default function SlideRoute({ direction, ...props }) {
  return (
    <Slide direction={direction || 'left'} in={true} mountOnEnter unmountOnExit>
      <Route {...props} />
    </Slide>
  )
}
