export const addItemOrder = (item: ItemOrder) => ({
  type: 'ADD_ITEM_ORDER',
  item,
})

export const updateItemOrder = (oldItem: ItemOrder, newItem: ItemOrder) => ({
  type: 'UPDATE_ITEM_ORDER',
  oldItem,
  newItem,
})

export const removeItemOrder = (item: ItemOrder) => ({
  type: 'REMOVE_ITEM_ORDER',
  item,
})
