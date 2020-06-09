import importFirebase, {
  getCurrentSession,
  getCurrentRestaurant,
} from 'services/firebase'
import Restaurant from 'models/Restaurant'

export const fetchInitialData = user => dispatch => {
  const dispatchFetchInitialData = (data = {}) =>
    dispatch({
      type: 'FETCH_INITIAL_DATA_SUCCESS',
      ...data,
    })
  importFirebase().then(firebase => {
    firebase.auth().onAuthStateChanged(async user => {
      if (!user) return dispatchFetchInitialData()
      else {
        const session = await getCurrentSession()
        if (session) {
          const restaurant = await getCurrentRestaurant()

          return dispatchFetchInitialData({ user, session, restaurant })
        } else {
          return dispatchFetchInitialData({ user })
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

  importFirebase().then(async firebase => {
    const sessionRef = await Restaurant.openSession(code).catch(console.error)

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
}
