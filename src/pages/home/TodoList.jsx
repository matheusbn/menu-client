import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  List,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@material-ui/core';
import Todo from './Todo';


const useStyles = makeStyles(theme => ({
  list: {
    width: "90%",
    maxWidth: "600px",
    marginTop: "0.7rem",
  },
  dialogContent: {
    width: "300px",
    padding: "30px 25px",
  },
  dialogText: {
    fontSize: "1.2rem",
  }
}))

function TodoList(props) {
  const classes = useStyles()
  const { todos = [] } = props;

  const [dialogOpen, setDialogOpen] = useState(false)
  const todoIdToDelete = useRef(null)

  const handleDialogConfirm = (todo) => {
    props.removeTodo(todoIdToDelete.current)
    setDialogOpen(false)
  }

  const confirmRemoveTodo = (todo) => {
    todoIdToDelete.current = todo.id
    setDialogOpen(true)
  }

  return (
    <>
      <List className={classes.list}>
        {todos.map((todo, i) =>
          <Todo key={todo.id || i} todo={todo} confirmRemoveTodo={confirmRemoveTodo} loading={todo.loading} />
        )}
      </List>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogContent dividers className={classes.dialogContent}>
          <Typography gutterBottom variant="subtitle1" className={classes.dialogText}>
            Are you sure?
          </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setDialogOpen(false)} size="small">
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={handleDialogConfirm}>
              Confirm
            </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TodoList;
