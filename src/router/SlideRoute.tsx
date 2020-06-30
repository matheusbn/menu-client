import React from 'react'
import { Route } from 'router'
import { Slide } from '@material-ui/core'

/**
 * pay attention to absolute or fixed positioned elements
 */
export default function SlideRoute({ direction, appear = true, ...props }) {
  return (
    <Slide
      direction={direction || 'left'}
      in={true}
      appear={appear}
      mountOnEnter
      unmountOnExit
    >
      <div>
        <Route {...props} />
      </div>
    </Slide>
  )
}
