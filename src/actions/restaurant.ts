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
