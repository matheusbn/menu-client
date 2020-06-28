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

const mockItemOrder: ItemOrder = {
  item: {
    description:
      'Hambúrguer angus (120g), queijo prato, bacon crocante, alface, tomate e joe’s sauce.',
    id: 'dGNsnMbnbn8mX0uOtmvS',
    name: 'Classic Bacon',
    optionals: [
      {
        name: 'Extras',
        options: [
          { name: 'Queijo', price: 1 },
          { name: 'Bacon', price: 2.5 },
          { name: 'Hamburguer', price: 5 },
        ],
      },
      {
        name: 'Tipo do Pão',
        options: [
          { name: 'Brioche', price: 1 },
          { name: 'Rosetta' },
          { name: 'Australiano', price: 1 },
        ],
        required: { max: 1, min: 1 },
      },
    ],
    pictures: [
      'https://media-cdn.tripadvisor.com/media/photo-p/0e/aa/df/83/double-classic-bacon.jpg',
    ],
    price: 21,
    section: 'Burgers',
  },
  amount: 2,
  selectedOptionals: {
    Extras: [
      { name: 'Bacon', price: 2 },
      { name: 'Hamburguer', price: 5 },
    ],
    'Tipo do Pão': { name: 'Australiano', price: 1 },
  },
  observation: 'sem pao',
  price: 42.5,
}

const mockOrder: Order = [{ ...mockItemOrder }, { ...mockItemOrder }]

const order = (
  // state: Order = [],
  state = mockOrder,
  action
) => {
  switch (action.type) {
    case `ADD_ITEM_ORDER`:
      return [...state, action.item]
    case `UPDATE_ITEM_ORDER`:
      return state.map(item =>
        item === action.oldItem ? { ...item, ...action.newItem } : item
      )
    case `REMOVE_ITEM_ORDER`:
      return state.filter(item => item !== action.item)
    case `ADD_ORDER`:
      return []
    default:
      return state
  }
}

const selectedItemOrder = (state = {}, action) => {
  switch (action.type) {
    case `SET_SELECTED_ITEM_ORDER`:
      return action.item
    default:
      return state
  }
}

const mockBill = new Array(2).fill(0).map(e => {
  let arr: Order = [...mockOrder]
  arr.orderedAt = new Date()
  return arr
})

const bill = (state: Order[] = mockBill, action) => {
  switch (action.type) {
    case `ADD_ORDER`:
      console.log(action.order)
      return [...state, action.order]
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
  selectedItemOrder,
  bill,
})
