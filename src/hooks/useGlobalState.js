import React, { useContext } from 'react'
import GlobalStateContext from 'contexts/global-state'
import SetGlobalStateContext from 'contexts/set-global-state'

const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(SetGlobalStateContext),
]

export default useGlobalState
