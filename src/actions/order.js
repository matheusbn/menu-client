export const addItemOrder = item => ({
  type: 'ADD_ITEM_ORDER',
  item,
})

export const updateItemOrder = (oldItem, newItem) => ({
  type: 'UPDATE_ITEM_ORDER',
  oldItem,
  newItem,
})

export const removeItemOrder = item => ({
  type: 'REMOVE_ITEM_ORDER',
  item,
})
