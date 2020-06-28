import { combineReducers } from 'redux'

const user = (state = null, action) => {
  switch (action.type) {
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.user || null
    default:
      return state
  }
}

const restaurant = (state = null, action) => {
  switch (action.type) {
    case `OPEN_SESSION_SUCCESS`:
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
      return action.restaurant || null
    case `CHECKOUT`:
      return null
    default:
      return state
  }
}

const menuItems = (state: Item[] = [], action) => {
  switch (action.type) {
    case `FETCH_MENU_ITEMS_RECEIVE`:
      return action.menuItems
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
    id: 'dGNsnMbnbn8mX0uOtmvS',
    name: 'Classic Bacon',
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

const mockOrder: Order = {
  items: [{ ...mockItemOrder }, { ...mockItemOrder }],
}

const stagingOrder = (
  state: Order = { items: [] },
  // state = mockOrder,
  action
) => {
  switch (action.type) {
    case `ADD_ITEM_ORDER`:
      return {
        ...state,
        items: [...state.items, action.item],
      }
    case `UPDATE_ITEM_ORDER`:
      return {
        ...state,
        items: state.items.map(item =>
          item === action.oldItem ? { ...item, ...action.newItem } : item
        ),
      }
    case `REMOVE_ITEM_ORDER`:
      return {
        ...state,
        items: state.items.filter(item => item !== action.item),
      }
    case `ADD_ORDER`:
    case `CHECKOUT`:
      return {
        items: [],
      }
    default:
      return state
  }
}

const selectedItemOrder = (state: ItemOrder | null = null, action) => {
  switch (action.type) {
    case `SET_SELECTED_ITEM_ORDER`:
      return action.item
    case `CHECKOUT`:
      return null
    default:
      return state
  }
}

const mockBill = new Array(2).fill(0).map(e => {
  let arr: Order = { ...mockOrder }
  arr.orderedAt = new Date()
  return arr
})

// const session = (state = null, action) => {
//   switch (action.type) {
//     case `ADD_ORDER`:
//       return [...state, action.order]
//     default:
//       return state
//   }
// }

export default combineReducers({
  user,
  restaurant,
  menuItems,
  isFetchingInitialData,
  stagingOrder,
  selectedItemOrder,
})
