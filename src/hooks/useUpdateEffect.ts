/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react'

export default (effect, deps) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) isInitialMount.current = false
    else {
      return effect()
    }
  }, deps)
}
