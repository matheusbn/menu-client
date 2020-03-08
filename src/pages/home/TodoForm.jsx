import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(7),
    width: "90%",
    maxWidth: "500px",
  },
}));


function TodoForm({ addTodo }) {
  const classes = useStyles()
  const [todoText, setTodoText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoText === "") return

    addTodo({
      done: false,
      text: todoText
    })
    setTodoText("")
  }

  const handleInputChange = (e) => setTodoText(e.target.value)

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth className={classes.formControl} variant="filled">
        <InputLabel htmlFor="todo-input">Todo</InputLabel>
        <FilledInput
          id="todo-input"
          value={todoText}
          onChange={handleInputChange}
          autoFocus
          size="small"
          variant="filled"
          autoComplete="off"
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
}

export default TodoForm;
