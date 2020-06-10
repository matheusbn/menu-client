import importFirebase, {
  getCurrentSession,
  getCurrentRestaurant,
} from 'services/firebase'
import Restaurant from 'models/Restaurant'

export const subscribeUserData = () => dispatch => {
  const dispatchUserDataReceive = (data = {}) =>
    dispatch({
      type: 'SUBSCRIBE_USER_DATA_RECEIVE',
      ...data,
    })

  importFirebase().then(firebase => {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) return dispatchUserDataReceive()
      else {
        const session = await getCurrentSession()
        if (session) {
          const restaurant = await getCurrentRestaurant()

          return dispatchUserDataReceive({ user, session, restaurant })
        } else {
          return dispatchUserDataReceive({ user })
        }
      }
    })
  })
}

export const openSession = code => dispatch => {
  dispatch({
    type: 'OPEN_SESSION_REQUEST',
    code,
  })

  Restaurant.openSession(code)
    .then(async sessionRef => {
      const [restaurantSnapshot, sessionSnapshot] = await Promise.all([
        sessionRef.parent.parent.get(),
        sessionRef.get(),
      ])

      const restaurant = {
        ...restaurantSnapshot.data(),
        id: restaurantSnapshot.id,
      }
      const session = { ...sessionSnapshot.data(), id: sessionSnapshot.id }

      dispatch({
        type: 'OPEN_SESSION_SUCCESS',
        session,
        restaurant,
      })
    })
    .catch(console.error)
}
