import { useState } from "react";
import { isFunction } from "../helpers/utils"

export default (initialSate) => {
  const [state, setState] = useState(initialSate);

  return [
    state,
    updater => {
      const newState = isFunction(updater) ? updater(state) : updater;

      setState(prev => ({ ...prev, ...newState }));
    }
  ];
};
