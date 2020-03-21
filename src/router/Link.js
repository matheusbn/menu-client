import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import history from 'router/history'

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
      history.push(to)
    }
  };

  return (
    <a href={to} onClick={onClick} {...props} className={classes.link}>
      {children}
    </a>
  );
};
