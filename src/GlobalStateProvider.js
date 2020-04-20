import React, { useState } from 'react'
import useSetState from 'hooks/useSetState'
import GlobalStateContext from 'contexts/global-state'
import SetGlobalStateContext from 'contexts/set-global-state'

const defaultGlobalState = {
  currentUser: null,
  currentRestaurant: null,
  currentSession: null,
}

const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useSetState(defaultGlobalState)

  return (
    <GlobalStateContext.Provider value={state}>
      <SetGlobalStateContext.Provider value={setState}>
        {children}
      </SetGlobalStateContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalStateProvider
