import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress } from '@material-ui/core';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Todo from "../../models/Todo"

const useStyles = makeStyles({
  root: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
    // "@media (min-width: 768px)": {
    //   width: "20%"
    // }
  },
  loading: {
    marginTop: "20vh"
  }
})

function Home() {
  const classes = useStyles()
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    Todo.list().then(setTodos)
  }, [])

  const addTodo = todo => {
    setTodos([...todos, { loading: true }])

    Todo.add(todo)
      .then(({ id }) => {
        const readyTodos = todos.filter(todo => !todo.loading)
        setTodos([...readyTodos, {id, ...todo}])
      })
  }

  const removeTodo = id => Todo.remove(id)
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))

  return (
    <section className={classes.root}>
      <Typography variant="h3">
        welcome home
      </Typography>
      <Typography variant="h6">
        feel free to add some todos below aye
      </Typography>

      <TodoForm addTodo={addTodo} />
      {todos ? <TodoList todos={todos} removeTodo={removeTodo} />
        : <CircularProgress className={classes.loading}/>
      }
    </section>
  );
}

export default Home;
