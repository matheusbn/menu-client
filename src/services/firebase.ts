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
    // firebase
    //   .firestore()
    //   .enablePersistence()
    //   .then(() => console.log('firestore offline mode enabled'))
    //   .catch(err => {
    //     if (err.code == 'failed-precondition')
    //       console.error('multiple tabs open')
    //     if (err.code == 'unimplemented') console.error('browser not supported')
    //   })

    firebase.auth().languageCode = 'pt'

    isInitialized = true
  }

  return firebase
}

export const getCurrentUser = () =>
  importFirebase().then(firebase => {
    return firebase.auth().currentUser
  })

/**
 * Returns the a ref to the first user session that hasnt been checked out yet, or null
 * @param user
 */
export const getUserCurrentSessionRef = async (
  user
): Promise<firebase.firestore.DocumentReference | null> => {
  const firebase = await importFirebase()

  const db = firebase.firestore()
  const result = await db
    .collectionGroup('sessions')
    .where('userId', '==', user.uid)
    .where('checkoutAt', '==', null)
    .get()

  if (result.empty) return null
  // TODO: something if result.docs.lenght > 1
  return result.docs[0].ref
}
