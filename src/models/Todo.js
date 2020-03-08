import importFirebase from '../services/firebase'

const callOnTodos = async (callback) => {
  const firebase = await importFirebase()
  const db = firebase.firestore()

  return callback(db.collection("todos"))
}

const list = () => callOnTodos(async todos => {
  const querySnapshot = await todos.get()
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}) )
})

const add = (todo) => callOnTodos(todos => todos.add(todo))
const remove = (id) => callOnTodos(todos => todos.doc(id.toString()).delete())

export default {
  list,
  add,
  remove
}
