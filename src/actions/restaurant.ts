import Restaurant from 'models/Restaurant'

export const addOrder = (order: Order) => async (dispatch, getState) => {
  if (!order) {
    throw Error(`expected an order as parameter. Received: ${order}`)
  }
  dispatch({
    type: 'ADD_ORDER',
  })

  const { restaurant } = getState()
  restaurant.currentSession.addOrder(order)
}

export const checkout = (totalPrice: number) => async (dispatch, getState) => {
  const { restaurant } = getState()
  await restaurant.currentSession.checkout(totalPrice)

  dispatch({
    type: 'CHECKOUT',
  })
}

export const openSession = code => async dispatch => {
  dispatch({
    type: 'OPEN_SESSION_REQUEST',
  })

  const restaurant = await Restaurant.fromTableCode(code)
  await restaurant.openSession(code)

  return dispatch({
    type: 'OPEN_SESSION_SUCCESS',
    restaurant,
  })
}
