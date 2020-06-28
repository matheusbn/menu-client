import Restaurant from '~/models/Restaurant'

// orders are added to the bill
export const addOrder = (order: Order) => async (dispatch, getState) => {
  if (!order) return

  const { user, restaurant } = getState()
  order.userId = user.uid
  order.sessionId = restaurant.sessionSnapshot.id
  restaurant.addOrder({
    items: order,
    orderedAt: order.orderedAt,
    userId: user.uid,
    sessionId: restaurant.sessionSnapshot.id,
  })

  dispatch({
    type: 'ADD_ORDER',
    order,
  })
}
