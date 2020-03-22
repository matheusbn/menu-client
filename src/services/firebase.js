let isInitialized = false;

export default async function importFirebase() {
  const firebase = await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/app')
  await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/firestore')
  await import(
    /* webpackChunkName: 'firebase' */
    /* webpackPrefetch: true */
    'firebase/auth')

  if (!isInitialized) {
    const firebaseConfig = {
      apiKey: "AIzaSyAA6ZzEaw6xYDXpM6fPQbBQmyvFQPjZwfw",
      authDomain: "apptodoz.firebaseapp.com",
      databaseURL: "https://apptodoz.firebaseio.com",
      projectId: "apptodoz",
      storageBucket: "apptodoz.appspot.com",
      messagingSenderId: "606873914981",
      appId: "1:606873914981:web:7ab0ef689aba67486fc08c",
      measurementId: "G-TZWZ78FE4Y"
    }

    firebase.initializeApp(firebaseConfig)

    firebase.firestore().enablePersistence()
      .then(() => console.log('firestore offline mode enabled'))
      .catch(e => {
        if (err.code == 'failed-precondition') console.error('multiple tabs open')
        if (err.code == 'unimplemented') console.error('browser not supported')
      });

    firebase.auth().languageCode = 'pt'

    isInitialized = true
  }

  return firebase
}
