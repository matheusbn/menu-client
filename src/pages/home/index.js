import React, { useState, useContext, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Typography,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import Todo from "models/Todo"
import useToast from 'hooks/useToast'

const useStyles = makeStyles({
  root: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40,
    // "@media (min-width: 768px)": {
    //   width: "20%"
    // }
    display: "grid",
    padding: "20px",

    "& .home-title": {
      width: "80%",
      margin: "0 auto",
      marginBottom: "50px",
      "& h1": {
        marginBottom: "40px",
      }
    },
    "& .home-actions": {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  loading: {
    marginTop: "20vh"
  }
})

const Divider = withStyles({
  root: {
    width: "60%",
    margin: "0 auto",
    borderBottom: "1px solid lightgray",

  }
})(({classes}) => (
  <div className={classes.root} />
))

function Home() {
  const classes = useStyles()
  const [todos, setTodos] = useState(null)
  const showToast = useToast()

  // TODO: fix the return clean function
  useEffect(() => Todo.subscribe(setTodos), [])

  const addTodo = todo => {
    setTodos(prev => [...prev, { loading: true }])

    Todo.add(todo)
      .then(({ id }) => {
        const readyTodos = todos.filter(todo => !todo.loading)
        setTodos([...readyTodos, {id, ...todo}])
      })
  }

  const removeTodo = id => Todo.remove(id)
    .then(() => setTodos(todos.filter(todo => todo.id !== id)))

  const handleToaster = () => {
    showToast('e ai mlk doido', { severity: "success" })
  }

  return (
    <section className={classes.root}>
      <div className="home-title">
        <Typography variant="h4" component="h1" align="center">
          Bem-vindo!
        </Typography>
        <Typography variant="body2" align="center">
          Para começar, escaneie o QR Code ou insira o código de sua mesa.
        </Typography>
      </div>
      <div className="home-actions">
        <Button
          block
          variant="contained"
          onClick={handleToaster}
          style={{ width: "100%" }}
        >
          Escanear QR Code
        </Button>

        <Divider />

        <TextField
          label="Código"
          // value={}
          // onChange={handlePhone}
          // size="small"
          // margin="dense"
          variant="outlined"
        />
      </div>
    </section>
  );
}

export default Home;
