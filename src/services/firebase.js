let isInitialized = false

export default async function importFirebase() {
  const firebase = await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/app'
  )
  await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/firestore'
  )
  await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/auth'
  )

  if (!isInitialized) {
    const firebaseConfig = {
      apiKey: 'AIzaSyAA6ZzEaw6xYDXpM6fPQbBQmyvFQPjZwfw',
      authDomain: 'apptodoz.firebaseapp.com',
      databaseURL: 'https://apptodoz.firebaseio.com',
      projectId: 'apptodoz',
      storageBucket: 'apptodoz.appspot.com',
      messagingSenderId: '606873914981',
      appId: '1:606873914981:web:7ab0ef689aba67486fc08c',
      measurementId: 'G-TZWZ78FE4Y',
    }

    firebase.initializeApp(firebaseConfig)

    // probably shouldnt happen on production
    firebase
      .firestore()
      .enablePersistence()
      .then(() => console.log('firestore offline mode enabled'))
      .catch(e => {
        if (err.code == 'failed-precondition')
          console.error('multiple tabs open')
        if (err.code == 'unimplemented') console.error('browser not supported')
      })

    firebase.auth().languageCode = 'pt'

    isInitialized = true
  }

  return firebase
}

export const getCurrentUser = () =>
  importFirebase().then(firebase => {
    console.log(firebase.auth().currentUser)
    return firebase.auth().currentUser
  })

const getCurrentSessionSnapshot = async () => {
  const firebase = await importFirebase()

  const user = firebase.auth().currentUser

  const db = firebase.firestore()
  const result = await db
    .collectionGroup('sessions')
    .where('userId', '==', user.uid)
    .where('checkoutAt', '==', null)
    .get()

  if (result.empty) return null
  // TODO: something if result.docs.lenght > 1
  return result.docs[0]
}

export const getCurrentSession = async () => {
  const session = await getCurrentSessionSnapshot()

  if (!session) return null

  return {
    ...session.data(),
    id: session.id,
  }
}

export const getCurrentRestaurant = async () => {
  const session = await getCurrentSessionSnapshot()
  if (!session) return null
  const restaurant = await session.ref.parent.parent.get()

  return {
    ...restaurant.data(),
    id: restaurant.id,
  }
}
