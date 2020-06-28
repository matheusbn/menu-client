export const fetchMenuItems = () => async (dispatch, getState) => {
  const { restaurant } = getState()
  const menuItems = await restaurant.getMenuItems()

  dispatch({
    type: 'FETCH_MENU_ITEMS_RECEIVE',
    menuItems,
  })
}
