import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  Paper,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { MoreVert as MoreVertIcon  } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: "0.2rem"
  },
  skeletonCheckbox: {
    margin: 11
  },
  skeletonVertMenu: {
    marginRight: 20
  }
}))

function Todo({ todo, confirmRemoveTodo, loading }) {
  const classes = useStyles()
  const [done, setDone] = useState(todo.done)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const menuOpen = Boolean(menuAnchorEl)

  const toggleTodo = () => setDone(!done)

  const handleMenuClick = e => {
    setMenuAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <ListItem button onClick={toggleTodo}>
          <ListItemIcon>
            {
              loading ? (
                <Skeleton variant="rect" height={20} width={20} className={classes.skeletonCheckbox} />
              ) : (
              <Checkbox
                checked={done}
                color="primary"
                disableRipple
              />
              )
            }
          </ListItemIcon>

          {
            loading ? (
              <Skeleton height={25} width="50%" />
            ) : (
              <ListItemText>{todo.text}</ListItemText>
            )
          }

          <ListItemSecondaryAction>
            {
              loading ? (
                <Skeleton variant="rect" height={30} width={10}  className={classes.skeletonVertMenu} />
              ) : (
                <>
                  <IconButton onClick={handleMenuClick}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="todo-menu"
                    anchorEl={menuAnchorEl}
                    keepMounted
                    open={menuOpen}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Share</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={() => confirmRemoveTodo(todo)}>Remove</MenuItem>
                  </Menu>
                </>
              )
            }
          </ListItemSecondaryAction>
        </ListItem>
      </Paper>
    </>
  );
}

export default Todo;
