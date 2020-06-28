import importFirebase, { getUserCurrentSession } from 'services/firebase'
import Restaurant from 'models/Restaurant'
import Session from 'models/Session'

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
        const sessionSnapshot = await getUserCurrentSession(user)
        if (sessionSnapshot) {
          const restaurantSnapshot = await sessionSnapshot.ref.parent.parent.get()
          const restaurant = new Restaurant(restaurantSnapshot)
          restaurant.currentSession = new Session(sessionSnapshot)

          return dispatchUserDataReceive({ user, restaurant })
        } else {
          return dispatchUserDataReceive({ user })
        }
      }
    })
  })
}

export const openSession = code => async dispatch => {
  dispatch({
    type: 'OPEN_SESSION_REQUEST',
  })

  const restaurant = await Restaurant.fromTableCode(code)
  await restaurant.openSession(code)

  dispatch({
    type: 'OPEN_SESSION_SUCCESS',
    restaurant,
  })
}
