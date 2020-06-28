import Restaurant from '~/models/Restaurant'

// orders are added to the bill
export const addOrder = (order: Order) => async (dispatch, getState) => {
  if (!order) return

  const { restaurant } = getState()
  restaurant.currentSession.addOrder(order)

  dispatch({
    type: 'ADD_ORDER',
    order,
  })
}
