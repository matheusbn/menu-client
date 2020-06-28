class Session {
  private snapshot
  orders: Order[] = []

  constructor(snapshot) {
    this.snapshot = snapshot
  }

  async addOrder(order) {
    const ref = await this.snapshot.ref.collection('orders').add(order)

    if (ref?.id) {
      this.orders.push(order)
    } else {
      // do something hehe
    }
  }

  async checkout(totalPrice) {
    this.snapshot.ref.update({
      checkoutAt: new Date(),
      totalPrice,
    })
  }
}

export default Session
