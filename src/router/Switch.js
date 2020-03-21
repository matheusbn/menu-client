import React, { useState, useEffect } from "react";
import history from 'router/history'

export default function Switch(props) {
  const routes = React.Children.toArray(props.children)
  const [currentRelativeUrl, setCurrentRelativeUrl] = useState(history.location)

  useEffect(() => {
    const handler = (e) => setCurrentRelativeUrl(history.location)
    window.addEventListener("locationchange", handler);

    return () => {
      window.removeEventListener("locationchange", handler);
    };
  }, []);


  const route = routes.find(route => {
    const { path, exact } = route.props

    if (exact) return currentRelativeUrl === path

    if(currentRelativeUrl.match(new RegExp(path))) {
      history.replace(path)
      return true
    }

    return false
  })

  return route
}
