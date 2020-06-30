import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  CircularProgress,
  Button,
  Typography,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from 'actions'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    padding: theme.spacing(4),

    '& button': {
      paddingLeft: '2.2rem',
      paddingRight: '2.2rem',
    },
  },
}))

const Signup = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')

  const handleName = e => setName(e.target.value)

  const handleConfirm = e => {
    if (!name) return

    setLoading(true)

    user
      .updateProfile({
        displayName: name,
      })
      .then(
        () => {
          dispatch(updateUser({ displayName: name }))
        },
        error => {
          console.error(error)
        }
      )
      .finally(() => setLoading(false))
  }

  return (
    <section className={classes.root}>
      <div>
        <Typography variant="caption" align="center" gutterBottom>
          Só mais uma coisinha...
        </Typography>
        <br />
        <Typography variant="h5" component="body1" align="center" gutterBottom>
          Qual é o seu nome?
        </Typography>
      </div>

      <TextField
        fullWidth
        label="Nome"
        value={name}
        onChange={handleName}
        variant="outlined"
      />

      <Button
        type="submit"
        variant="contained"
        onClick={handleConfirm}
        endIcon={loading && <CircularProgress color="white" size={20} />}
      >
        Entrar
      </Button>
    </section>
  )
}

export default Signup
