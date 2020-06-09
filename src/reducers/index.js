import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case `FETCH_INITIAL_DATA_SUCCESS`:
      return action.user || null
    default:
      return state
  }
}
const session = (state = null, action) => {
  switch (action.type) {
    case `OPEN_SESSION_SUCCESS`:
    case `FETCH_INITIAL_DATA_SUCCESS`:
      return action.session || null
    default:
      return state
  }
}
const restaurant = (state = null, action) => {
  switch (action.type) {
    case `OPEN_SESSION_SUCCESS`:
    case `FETCH_INITIAL_DATA_SUCCESS`:
      return action.restaurant || null
    default:
      return state
  }
}

const isFetchingInitialData = (state = true, action) => {
  switch (action.type) {
    case `FETCH_INITIAL_DATA_REQUEST`:
      return true
    case `FETCH_INITIAL_DATA_SUCCESS`:
    case `FETCH_INITIAL_DATA_FAILURE`:
      return false
    default:
      return state
  }
}

export default combineReducers({
  user,
  session,
  restaurant,
  isFetchingInitialData,
})
