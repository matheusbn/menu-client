import importFirebase, { getCurrentUser } from 'services/firebase'

class RestaurantService {
  private ref: firebase.firestore.DocumentReference

  constructor(ref) {
    this.ref = ref
  }

  async addOrder(
    order: OrderData
  ): Promise<firebase.firestore.DocumentReference> {
    return this.ref.collection('orders').add(order)
  }

  async getSessionOrders(
    sessionId
  ): Promise<firebase.firestore.DocumentSnapshot[]> {
    const result = await this.ref
      .collection('orders')
      .where('sessionId', '==', sessionId)
      .get()

    return result.docs
  }

  async getMenuItems(): Promise<
    Promise<firebase.firestore.DocumentSnapshot[]>
  > {
    const result = await this.ref.collection('items').get()

    return result.docs
  }

  static async getSnapshotFromTableCode(
    tableCode: string
  ): Promise<firebase.firestore.DocumentSnapshot> {
    const restaurants = await getCollection()

    const result = await restaurants
      .where('tableCodes', 'array-contains-any', [tableCode.toUpperCase()])
      .get()

    if (result.empty) throw new Error('code not found')

    return result.docs[0]
  }

  async addSession(
    tableCode: string
  ): Promise<firebase.firestore.DocumentReference> {
    const user = await getCurrentUser()
    if (!user) throw new Error('User must be signed in')

    const sessionRef = await this.ref.collection('sessions').add({
      checkinAt: new Date(),
      checkoutAt: null,
      tableCode,
      userId: user.uid,
    })

    return sessionRef
  }
}

const getCollection = async () => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return db.collection('restaurants')
}

export default RestaurantService
