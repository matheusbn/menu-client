import { combineReducers } from 'redux'

const user = (state: object | null = null, action) => {
  switch (action.type) {
    case `SET_USER`:
      return action.user
    case `UPDATE_USER`:
      if (!state) throw new Error("can't update unexisting user")

      return {
        ...state,
        ...action.data,
      }
    default:
      return state
  }
}

const restaurant = (state: Restaurant | null = null, action) => {
  switch (action.type) {
    case `SET_RESTAURANT`:
      return action.restaurant
    case `CHECKOUT`:
      return null
    default:
      return state
  }
}

const menuItems = (state: MenuItem[] = [], action) => {
  switch (action.type) {
    case `SET_MENU_ITEMS`:
      return action.menuItems
    case `CHECKOUT`:
      return []
    default:
      return state
  }
}

const isFetchingInitialData = (state = true, action) => {
  // this shoudnt be assigned true again
  switch (action.type) {
    case `SUBSCRIBE_USER_DATA_RECEIVE`:
    case `FETCH_INITIAL_DATA_FAILURE`:
    case `FETCH_INITIAL_DATA_SUCCESS`:
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

// const mockOrder: Order = {
//   items: [{ ...mockItemOrder }, { ...mockItemOrder }],
// }

const stagingOrder = (
  state: ItemOrder[] = [],
  // state = mockOrder,
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
    case `CHECKOUT`:
      return []
    default:
      return state
  }
}

const selectedItemOrder = (state: ItemOrder | null = null, action) => {
  switch (action.type) {
    case `SET_SELECTED_ITEM_ORDER`:
      return action.item
    case `CHECKOUT`:
    case `ADD_ORDER`:
      return null
    default:
      return state
  }
}

const orders = (state: Order[] = [], action) => {
  switch (action.type) {
    case `SET_ORDERS`:
      return action.orders
    case `ADD_ORDER`:
      return [...state, action.order]
    case `CHECKOUT`:
      return []
    default:
      return state
  }
}

const session = (state: Session | null = null, action) => {
  switch (action.type) {
    case `SET_SESSION`:
      return action.session
    case `CHECKOUT`:
      return null
    default:
      return state
  }
}

export default combineReducers({
  user,
  restaurant,
  session,
  menuItems,
  orders,
  isFetchingInitialData,
  stagingOrder,
  selectedItemOrder,
})
