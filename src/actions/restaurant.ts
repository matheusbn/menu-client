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

  const [itemSnapshots, sessionSnapshot, orderSnapshots] = await Promise.all([
    restaurantService.getMenuItems(),
    sessionRef.get(),
    restaurantService.getSessionOrders(sessionRef.id),
  ])

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
  const session = {
    ref: sessionRef,
    data: sessionSnapshot.data(),
  }

  dispatch({ type: 'SET_RESTAURANT', restaurant })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_ORDERS', orders })
  dispatch({ type: 'SET_SESSION', session })
}

export const initSession = tableCode => async dispatch => {
  const restaurantSnapshot = await RestaurantService.getSnapshotFromTableCode(
    tableCode
  )

  const restaurantService = new RestaurantService(restaurantSnapshot.ref)

  const sessionRef = await restaurantService.addSession(tableCode)

  const [itemSnapshots, sessionSnapshot] = await Promise.all([
    restaurantService.getMenuItems(),
    sessionRef.get(),
  ])

  const session = {
    ref: sessionRef,
    data: sessionSnapshot.data(),
  }

  const restaurant = {
    ref: restaurantSnapshot.ref,
    data: restaurantSnapshot.data(),
  }

  const menuItems = itemSnapshots.map(itemSnapshot => ({
    ref: itemSnapshot.ref,
    data: itemSnapshot.data(),
  }))

  dispatch({ type: 'SET_RESTAURANT', restaurant })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_MENU_ITEMS', menuItems })
  dispatch({ type: 'SET_SESSION', session })
}
