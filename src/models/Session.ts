class Session {
  private snapshot
  orders: Order[] = []

  constructor(snapshot) {
    this.snapshot = snapshot

    this.loadOrders()
  }

  async addOrder(order) {
    const ref = await this.snapshot.ref.collection('orders').add(order)

    if (ref?.id) {
      this.orders.push(order)
    } else {
      // do something hehe
    }
  }

  private async loadOrders() {
    const querySnapshot = await this.snapshot.ref.collection('orders').get()

    this.orders = querySnapshot.docs.map(snapshot => ({
      id: snapshot.id,
      ...snapshot.data(),
    }))
  }

  async checkout(totalPrice) {
    this.snapshot.ref.update({
      checkoutAt: new Date(),
      totalPrice,
    })
  }
}

export default Session
