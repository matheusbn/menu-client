// orders are added to the bill
export const addOrder = (order: Order) => ({
  type: 'ADD_ORDER',
  order,
})
