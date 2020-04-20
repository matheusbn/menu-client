import importFirebase, {
  getCurrentUser,
  getCurrentSession,
} from 'services/firebase'

const getCollection = async () => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return db.collection('restaurants')
}

const list = async () => {
  const restaurants = await getCollection()

  const querySnapshot = await restaurants.get()
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

const subscribe = async callback => {
  const restaurants = await getCollection()

  return restaurants.onSnapshot(querySnapshot => {
    const restaurants = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(restaurants)
  })
}

const add = async restaurant => {
  const restaurants = await getCollection()

  restaurants.add(restaurant)
}
const remove = async id => {
  const restaurants = await getCollection()

  restaurants.doc(id.toString()).delete()
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

  // TODO: set current session
  // TODO: set current restaurant
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

export default {
  subscribe,
  list,
  add,
  remove,
  openSession,
  subscribeMenu,
}
