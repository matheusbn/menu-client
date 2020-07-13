class Session {
  private snapshot

  constructor(snapshot) {
    this.snapshot = snapshot
  }

  get id() {
    return this.snapshot.id
  }

  async checkout(totalPrice) {
    this.snapshot.ref.update({
      checkoutAt: new Date(),
      totalPrice,
    })
  }
}

export default Session
