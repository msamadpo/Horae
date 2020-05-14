import React from 'react';
import { Action } from 'context/GlobalReducer';

const GlobalContext = React.createContext({
  data: {},
  dispatch: (arg0: Action) => {},
});

export default GlobalContext;
