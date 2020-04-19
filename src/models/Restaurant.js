import importFirebase, { getCurrentUser } from 'services/firebase'

const callOnCollection = async (callback) => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return callback(db.collection("restaurants"))
}

const list = () => callOnCollection(async restaurants => {
  const querySnapshot = await restaurants.get()
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}) )
})

const subscribe = (callback) => callOnCollection(async restaurants => {
  return restaurants.onSnapshot(querySnapshot => {
    const restaurants = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}) )
    callback(restaurants)
  })
})

const add = (restaurant) => callOnCollection(restaurants => restaurants.add(restaurant))
const remove = (id) => callOnCollection(restaurants => restaurants.doc(id.toString()).delete())

const openSession = (tableCode) => callOnCollection(async restaurants => {
  console.log(tableCode)
  const result = await restaurants.where('tableCodes', 'array-contains-any', [tableCode]).get()
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
})

export default {
  subscribe,
  list,
  add,
  remove,
  openSession
}
