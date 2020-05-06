import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'assets/styles/global.scss';
import HoraeApp from 'components/HoraeApp';
import Marketing from 'components/Marketing';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Marketing} exact />
        <Route path="/app" component={HoraeApp} exact />
      </Switch>
    </Router>
  );
}

export default App;
