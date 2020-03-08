import importFirebase from './firebase'

export default importFirebase.then(firebase => {
  const db = firebase.firestore()

  const todos = db.collection("todos")

  const list = async () => {
    const querySnapshot = await todos.get()
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}) )
  }

  const add = async (todo) => await todos.add(todo)
  const remove = async (id) => await todos.doc(id.toString()).delete()

  return {
    todos: {
      list,
      add,
      remove
    }
  }
})
