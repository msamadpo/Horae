import React from 'react';

const Context = React.createContext({
  userData: {},
  dispatch: (action: any) => {},
});

export default Context;
