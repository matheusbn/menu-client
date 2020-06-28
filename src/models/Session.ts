class Session {
  private snapshot

  constructor(snapshot) {
    this.snapshot = snapshot
  }

  async addOrder(order) {
    this.snapshot.ref.collection('orders').add(order)
  }
}

export default Session
