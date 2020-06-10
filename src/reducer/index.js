import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.user || null
    default:
      return state
  }
}
const session = (state = null, action) => {
  switch (action.type) {
    case `OPEN_SESSION_SUCCESS`:
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.session || null
    default:
      return state
  }
}
const restaurant = (state = null, action) => {
  switch (action.type) {
    case `OPEN_SESSION_SUCCESS`:
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.restaurant || null
    default:
      return state
  }
}

const isFetchingInitialData = (state = true, action) => {
  // this shoudnt be assigned true again
  switch (action.type) {
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
    case `FETCH_INITIAL_DATA_FAILURE`:
      return false
    default:
      return state
  }
}

const orders = [
  {
    name: 'Classic Bacon',
    amount: 3,
    optionals: {
      Extras: [
        { name: 'Bacon', price: 2 },
        { name: 'Hamburguer', price: 5 },
      ],
      'Tipo do Pão': [{ name: 'Australiano', price: 1 }],
    },
    observations: 'sem pao',
    price: 42.5,
  },
]

const order = (state = [...orders, ...orders, ...orders], action) => {
  switch (action.type) {
    case `ADD_ORDER_ITEM`:
      console.log(action.item)
      return [...state, action.item]
    default:
      return state
  }
}

export default combineReducers({
  user,
  session,
  restaurant,
  isFetchingInitialData,
  order,
})
