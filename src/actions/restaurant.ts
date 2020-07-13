import Restaurant from 'models/Restaurant'
import RestaurantService from 'services/restaurant'

export const checkout = (totalPrice: number) => async (dispatch, getState) => {
  const { session } = getState()
  session.ref.update({
    checkoutAt: new Date(),
    totalPrice,
  })

  dispatch({
    type: 'CHECKOUT',
  })
}

export const resumeSession = (
  sessionRef: firebase.firestore.DocumentReference
) => async dispatch => {
  const restaurantSnapshot = await sessionRef!.parent!.parent!.get()

  const restaurantService = new RestaurantService(restaurantSnapshot.ref)

  const itemSnapshots = await restaurantService.getMenuItems()
  const orderSnapshots = await restaurantService.getSessionOrders(sessionRef.id)

  const restaurant = {
    ref: restaurantSnapshot.ref,
    data: restaurantSnapshot.data(),
  }

  const orders = orderSnapshots.map(orderSnapshot => ({
    ref: orderSnapshot.ref,
    data: orderSnapshot.data(),
  }))

  const menuItems = itemSnapshots.map(itemSnapshot => ({
    ref: itemSnapshot.ref,
    data: itemSnapshot.data(),
  }))

  dispatch({ type: 'SET_RESTAURANT', restaurant })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_ORDERS', orders })
  dispatch({ type: 'SET_SESSION', session: { ref: sessionRef } })
}

export const initSession = tableCode => async dispatch => {
  const restaurantSnapshot = await RestaurantService.getSnapshotFromTableCode(
    tableCode
  )

  const restaurantService = new RestaurantService(restaurantSnapshot.ref)
  const sessionRef = await restaurantService
    .addSession(tableCode)
    .then(console.log)

  const restaurant = {
    ref: restaurantSnapshot.ref,
    data: restaurantSnapshot.data(),
  }

  const itemSnapshots = await restaurantService.getMenuItems()
  const menuItems = itemSnapshots.map(itemSnapshot => ({
    ref: itemSnapshot.ref,
    data: itemSnapshot.data(),
  }))

  dispatch({ type: 'SET_RESTAURANT', restaurant })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_SESSION', session: { ref: sessionRef } })
}

export const openSession = code => async dispatch => {
  dispatch({
    type: 'OPEN_SESSION_REQUEST',
  })

  const restaurant = await Restaurant.fromTableCode(code)
  // TODO: receeive menu items
  // TODO: receive orders
  await restaurant.openSession(code)

  return dispatch({
    type: 'OPEN_SESSION_SUCCESS',
    restaurant,
  })
}
