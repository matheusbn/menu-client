import React, { useEffect } from 'react'
import { history } from './index'

export default function Redirect({ to }) {
  if (typeof to !== 'string')
    throw new TypeError(
      `The props "to" must be a string. Received: ${typeof to}`
    )

  useEffect(() => {
    console.log('redirecting')

    history.replace(to)
  }, [])

  // return empty div instead of null so id doesnt
  // conflict with Slide transition from material ui
  return <div></div>
}
