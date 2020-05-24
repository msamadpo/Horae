import React, { useReducer } from 'react';
import HoraeApp from 'components/HoraeApp';
import Marketing from 'components/Marketing';
import mockData from 'assets/data/mockUserData.json';

import globalReducer from 'context/GlobalReducer';
import GlobalContext from 'context/GlobalContext';

import 'assets/styles/global.scss';

function App() {
  const [state, dispatch] = useReducer(globalReducer, mockData);
  return (
    <GlobalContext.Provider value={{ data: state, dispatch }}>
      <Marketing />
    </GlobalContext.Provider>
  );
}

export default App;
