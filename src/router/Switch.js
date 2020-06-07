import React, { useState, useRef, useEffect } from 'react'
import history from 'router/history'

export default function Switch(props) {
  const children = React.Children.toArray(props.children)
  const subscribed = useRef(false)
  const [currentRelativeUrl, setCurrentRelativeUrl] = useState(history.location)

  // Copied from react-router:
  // This is a bit of a hack. We have to start listening for location
  // changes here in the constructor in case there are any <Redirect>s
  // on the initial render. If there are, they will replace/push when
  // they mount and since componentDidMount fires in children before parents,
  //  we may get a new location before the <Router> is mounted.
  const handler = e => setCurrentRelativeUrl(history.location)
  if (!subscribed.current) {
    window.addEventListener('locationchange', handler)

    subscribed.current = true
  }

  useEffect(
    () => () => window.removeEventListener('locationchange', handler),
    []
  )

  const route = children.find(route => {
    const { path, exact } = route.props
    if (!path) return true

    const print =
      currentRelativeUrl === path || currentRelativeUrl.match(new RegExp(path))

    if (exact) return currentRelativeUrl === path

    if (currentRelativeUrl.match(new RegExp(path))) {
      window.history.replaceState({}, '', path)
      return true
    }

    return false
  })

  return route
}
