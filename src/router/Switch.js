import React, { useState, useRef } from "react";

export default function Switch(props) {
  const routes = React.Children.toArray(props.children)
  const [currentRelativeUrl, setCurrentRelativeUrl] = useState(window.location.pathname)

  useState(() => {
    const handler = (e) => setCurrentRelativeUrl(window.location.pathname)

  window.addEventListener("popstate", handler);
  window.addEventListener("locationchange", handler);

    return () => {
      window.removeEventListener("popstate", handler);
      window.removeEventListener("locationchange", handler);
    };
  }, []);

  return routes.find(route => route.props.path === currentRelativeUrl)
}
