import importFirebase, { getCurrentUser } from 'services/firebase'
import Session from './Session'

class Restaurant {
  private snapshot
  currentSessionRef

  constructor(snapshot) {
    this.snapshot = snapshot
  }

  get name(): string {
    return this.snapshot.data().name
  }

  get coverPicture(): string {
    return this.snapshot.data().coverPicture
  }

  subscribeMenu(callback) {
    return this.snapshot.ref.collection('items').onSnapshot(querySnapshot => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(items)
    })
  }

  async addOrder(order: Order): Promise<firebase.firestore.DocumentReference> {
    return this.snapshot.ref.collection('orders').add(order)
  }

  async getSessionOrders(
    sessionId
  ): Promise<firebase.firestore.DocumentReference> {
    const result = this.snapshot.ref
      .collection('orders')
      .where('sessionId', '==', sessionId)
      .get()

    return result.docs.map(orderSnapshot => ({
      ref: orderSnapshot,
      data: orderSnapshot(),
    }))
  }

  async getMenuItems(): Promise<firebase.firestore.DocumentSnapshot[]> {
    const querySnapshot = await this.snapshot.ref.collection('items').get()

    return querySnapshot.docs
  }

  static async fromTableCode(tableCode: string): Promise<Restaurant> {
    const restaurants = await getCollection()

    const result = await restaurants
      .where('tableCodes', 'array-contains-any', [tableCode])
      .get()
    if (result.empty) throw new Error('code not found')

    const restaurantSnapshot = result.docs[0]
    return new Restaurant(restaurantSnapshot)
  }

  async openSession(tableCode: string): Promise<void> {
    const user = await getCurrentUser()
    if (!user) throw new Error('User must be signed in')

    const sessionRef = await this.snapshot.ref.collection('sessions').add({
      checkinAt: new Date(),
      checkoutAt: null,
      tableCode,
      userId: user.uid,
    })

    this.currentSessionRef = sessionRef
  }
}

const getCollection = async () => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return db.collection('restaurants')
}

export default Restaurant
