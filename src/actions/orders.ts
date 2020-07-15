import RestaurantService from 'services/restaurant'

export const addOrder = (orderData: OrderData) => async (
  dispatch,
  getState
) => {
  if (!orderData) {
    throw Error(`expected OrderData as parameter. Received: ${orderData}`)
  }

  const { restaurant, session } = getState()
  const restaurantService = new RestaurantService(restaurant.ref)

  orderData.orderedAt = new Date()
  orderData.status = 'open'

  if (restaurant.data.tableCodeMap) {
    const table = restaurant.data.tableCodeMap[session.data.tableCode]
    if (table) orderData.fromTable = table
  }

  orderData.sessionId = session.ref.id

  const orderRef = await restaurantService.addOrder(orderData)

  dispatch({
    type: 'ADD_ORDER',
    order: {
      ref: orderRef,
      data: orderData,
    },
  })
}
