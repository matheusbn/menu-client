import { combineReducers } from 'redux'
import capitalize from 'lodash/capitalize'

const createFetchReducers = name => {
  const upperName = name.toUpperCase()
  const resource = (state = null, action) => {
    switch (action.type) {
      case `FETCH_${upperName}_SUCCESS`:
        return action[name]
      default:
        return state
    }
  }

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case `FETCH_${upperName}_REQUEST`:
        return true
      case `FETCH_${upperName}_SUCCESS`:
      case `FETCH_${upperName}_FAILURE`:
        return false
      default:
        return state
    }
  }

  return {
    [`isFetching${capitalize(name)}`]: isFetching,
    [name]: resource,
  }
}

const user = (state = null, action) => {
  switch (action.type) {
    case `FETCH_INITIAL_DATA_SUCCESS`:
      const user = action.data.user

      return user || null
    default:
      return state
  }
}
const session = (state = null, action) => {
  switch (action.type) {
    case `FETCH_INITIAL_DATA_SUCCESS`:
      const session = action.data.session

      return session || null

    default:
      return state
  }
}
const restaurant = (state = null, action) => {
  switch (action.type) {
    case `FETCH_INITIAL_DATA_SUCCESS`:
      const restaurant = action.data.restaurant

      return restaurant || null
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
