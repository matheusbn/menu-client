import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default ({ to, children, external, ...props }) => {
  const classes = useStyles();
  const onClick = e => {
    if (!external) {
      e.preventDefault()

      window.history.pushState({}, "", to)

      const locationChangeEvent = new CustomEvent("locationchange")
      locationChangeEvent.state = { name: "matheus" }
      window.dispatchEvent(locationChangeEvent)
    }
  };

  return (
    <a href={to} onClick={onClick} {...props} className={classes.link}>
      {children}
    </a>
  );
};
