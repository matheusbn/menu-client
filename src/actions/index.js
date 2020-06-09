import importFirebase, {
  getCurrentSession,
  getCurrentRestaurant,
} from 'services/firebase'

export const fetchInitialData = user => dispatch => {
  importFirebase().then(firebase => {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return dispatch({ type: 'FETCH_INITIAL_DATA_SUCCESS', data: {} })
      } else {
        const session = await getCurrentSession()
        if (session) {
          const restaurant = await getCurrentRestaurant()

          return dispatch({
            type: 'FETCH_INITIAL_DATA_SUCCESS',
            data: { user, session, restaurant },
          })
        } else {
          return dispatch({
            type: 'FETCH_INITIAL_DATA_SUCCESS',
            data: { user },
          })
        }
      }
    })
  })
}

export const fetchUser = user => dispatch => {
  dispatch({
    type: 'FETCH_USER_REQUEST',
    user,
  })

  importFirebase().then(firebase => {
    firebase.auth().onAuthStateChanged(async user => {
      dispatch({
        type: 'FETCH_USER_SUCCESS',
        user,
      })
    })
  })
}

export const fetchSession = session => dispatch => {
  dispatch({
    type: 'FETCH_SESSION_REQUEST',
    session,
  })

  importFirebase().then(async firebase => {
    const session = await getCurrentSession()
    dispatch({
      type: 'FETCH_SESSION_SUCCESS',
      session,
    })
  })
}

export const fetchRestaurant = restaurant => dispatch => {
  dispatch({
    type: 'FETCH_RESTAURANT_REQUEST',
    restaurant,
  })

  importFirebase().then(async firebase => {
    const restaurant = await getCurrentRestaurant()
    dispatch({
      type: 'FETCH_RESTAURANT_SUCCESS',
      restaurant,
    })
  })
}
