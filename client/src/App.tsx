import React, { useReducer } from 'react';
import HoraeApp from 'components/HoraeApp';
import GlobalState from 'context/GlobalContext';
import reducer from 'context/reducer';

import 'assets/styles/global.scss';

function App() {
  const [userData, dispatch] = useReducer(() => ({}), {});
  return (
    <GlobalState.Provider value={{ userData, dispatch }}>
      <HoraeApp />
    </GlobalState.Provider>
  );
}

export default App;
