export const addOrderItem = item => ({
  type: 'ADD_ORDER_ITEM',
  item,
})

export const removeOrderItem = item => ({
  type: 'REMOVE_ORDER_ITEM',
  item,
})
