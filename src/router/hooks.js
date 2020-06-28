import React, { useContext } from 'react'
import RouterContext from './RouterContext'

export function useParams() {
  const match = useContext(RouterContext).match
  return match ? match.params : {}
}
