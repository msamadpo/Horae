import React, { useReducer } from 'react';
import HoraeApp from 'components/HoraeApp';
import mockData from 'assets/data/mockUserData.json';

import globalReducer from 'context/GlobalReducer';
import GlobalContext from 'context/GlobalContext';

import 'assets/styles/global.scss';

function App() {
  const storedData = JSON.parse(localStorage.getItem('horaeData') || '{}');
  const defaultData =
    typeof storedData === 'object' && storedData.id ? storedData : mockData;

  const [state, dispatch] = useReducer(globalReducer, defaultData);
  // localStorage.setItem('horaeData', JSON.stringify(state));

  return (
    <GlobalContext.Provider value={{ data: state, dispatch }}>
      <HoraeApp />
    </GlobalContext.Provider>
  );
}

export default App;
