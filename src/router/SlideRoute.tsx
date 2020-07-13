import React from 'react'
import { Route } from 'router'
import { Slide } from '@material-ui/core'

interface SlideRouteProps {
  direction?: 'left' | 'right' | 'up' | 'down'
  appear?: boolean
  [other: string]: any
}
/**
 * pay attention to absolute or fixed positioned elements
 */
export default function SlideRoute({
  direction = 'left',
  appear = true,
  ...props
}: SlideRouteProps) {
  return (
    <Slide
      direction={direction}
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
