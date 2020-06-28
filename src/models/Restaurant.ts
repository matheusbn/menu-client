import importFirebase, {
  getCurrentUser,
  getCurrentSession,
} from 'services/firebase'
import { FirestoreModel } from '~/types'

class Restaurant {
  private snapshot
  sessionSnapshot

  constructor(snapshot, sessionSnapshot?) {
    this.snapshot = snapshot
    this.sessionSnapshot = sessionSnapshot
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

  static async fromTableCode(tableCode: string): Promise<Restaurant> {
    const restaurants = await getCollection()

    const result = await restaurants
      .where('tableCodes', 'array-contains-any', [tableCode])
      .get()
    if (result.empty) throw new Error('code not found')

    const restaurantSnapshot = result.docs[0]
    return new Restaurant(restaurantSnapshot)
  }

  async openSession(tableCode: string): Promise<object> {
    const user = await getCurrentUser()
    if (!user) throw new Error('User must be signed in')

    const sessionRef = await this.snapshot.ref.collection('sessions').add({
      checkinAt: new Date(),
      checkoutAt: null,
      tableCode,
      userId: user.uid,
    })

    this.sessionSnapshot = await sessionRef.get()
    return sessionRef
  }

  async addOrder(order) {
    this.snapshot.ref.collection('orders').add(order)
  }
}

const getCollection = async () => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return db.collection('restaurants')
}

const openSession = async tableCode => {
  const restaurants = await getCollection()

  const result = await restaurants
    .where('tableCodes', 'array-contains-any', [tableCode])
    .get()
  if (result.empty) throw new Error('code not found')

  const restaurant = result.docs[0]
  const user = await getCurrentUser()

  if (!user) throw new Error('User must be signed in')

  return restaurant.ref.collection('sessions').add({
    checkinAt: new Date(),
    checkoutAt: null,
    tableCode,
    userId: user.uid,
  })
}

// menu items

const subscribeMenu = async (restaurantID, callback) => {
  const restaurants = await getCollection()

  return restaurants
    .doc(restaurantID)
    .collection('items')
    .onSnapshot(querySnapshot => {
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      callback(items)
    })
}

export default Restaurant
