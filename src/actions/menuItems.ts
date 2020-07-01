export const fetchMenuItems = restaurant => async dispatch => {
  const menuItems = await restaurant.getMenuItems()

  dispatch({
    type: 'FETCH_MENU_ITEMS_RECEIVE',
    menuItems,
  })
}
