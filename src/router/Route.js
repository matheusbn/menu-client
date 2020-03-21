import React from "react";

export default function Route(props) {
  if (props.component) return <props.component />
  return props.children;
}
