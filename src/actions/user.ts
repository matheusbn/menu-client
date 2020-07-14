import importFirebase, { getUserCurrentSessionRef } from 'services/firebase'
import { resumeSession } from 'actions'
// import RestaurantService from 'service/restaurant'
import { history } from 'router'
// import Session from 'models/Session'

export const subscribeUserData = () => dispatch => {
  importFirebase().then(firebase => {
    try {
      firebase.auth().onAuthStateChanged(async user => {
        if (!user) {
          history.replace('/auth')
        } else {
          const sessionRef = await getUserCurrentSessionRef(user)

          if (sessionRef) {
            await dispatch(resumeSession(sessionRef))

            history.replace('/menu')
          } else {
            history.replace('/')
          }
        }

        dispatch({ type: 'SET_USER', user })
        dispatch({ type: 'FETCH_INITIAL_DATA_SUCCESS' })
      })
    } catch (error) {
      console.error(error)
    }
  })
}

export const updateUser = data => ({
  type: 'UPDATE_USER',
  data,
})
