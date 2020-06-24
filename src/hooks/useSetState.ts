import { useState } from 'react'
import { isFunction } from 'helpers/utils'

export default initialState => {
  const [state, setState] = useState(initialState)

  return [
    state,
    updater => {
      const newState = isFunction(updater) ? updater(state) : updater

      setState(prev => ({ ...prev, ...newState }))
    },
  ]
}
