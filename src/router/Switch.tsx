import React, { useState, useRef, useEffect } from 'react'
import history from 'router/history'
import RouterContext from './RouterContext'

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

  const contextInfo: { match? } = {}

  const route = children.find(route => {
    const { path, exact } = route.props
    if (!path) return true

    // this function will only return a value if the url corresponds
    // to the path pattern, so it must be safe to assume this is
    // the correct route
    const params = extractRouteParam(path, currentRelativeUrl)
    if (params) {
      contextInfo.match = { params }
      return route
    }

    if (exact) return currentRelativeUrl === path

    if (currentRelativeUrl.match(new RegExp(path))) {
      window.history.replaceState({}, '', path)
      return true
    }

    return false
  })

  return (
    <RouterContext.Provider value={contextInfo}>{route}</RouterContext.Provider>
  )
}

// returns dynamic route parameters based on the path pattern
// it finds only one param for now hehe
function extractRouteParam(
  path: string,
  url: string
): { [index: string]: string | undefined } | null {
  // this regex captures a named group containing everything after
  // the ":" and until the end or a slash "/"
  // the syntax ?<name> declares its name
  const paramNameRegex = /\/:(?<paramName>.*?)(?=\/|$)/
  let match = path.match(paramNameRegex)
  const paramName = match?.groups?.paramName
  if (!paramName) return null

  const paramIndex = path.search(paramNameRegex)
  // pathBeginning must be the portion of the path until the param,
  // with the trailing slash
  const pathBeginning = path.slice(0, paramIndex + 1)
  const urlBeginning = url.slice(0, paramIndex + 1)

  // path has a parameter but this url doesnt correspond to it
  if (pathBeginning != urlBeginning) return null

  // this regex is mostly the same as the other, but it
  // expects the string to already begin with the param value
  match = url.slice(paramIndex + 1).match(/(?<paramValue>.*)(?=\/|$)/)
  console.log(url.substring(paramIndex + 1))
  console.log(match)
  if (!match) return null

  return {
    [paramName]: match?.groups?.paramValue,
  }
}
