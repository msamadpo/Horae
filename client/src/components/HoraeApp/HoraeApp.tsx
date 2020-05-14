import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AppNavbar from 'components/HoraeApp/AppNavbar';
import CalendarPage from 'components/HoraeApp/CalendarPage';
import TodoPage from 'components/HoraeApp/TodoPage';
import AvatarPage from 'components/HoraeApp/AvatarPage';

const ITEMS = [
  {
    title: 'Calendar',
    icon: 'calendar',
    to: '/calendar',
  },
  {
    title: 'Todo',
    icon: 'todo',
    to: '/todo',
  },
  {
    title: 'Avatar',
    icon: 'avatar',
    to: '/avatar',
  },
];

const StyledApp = styled.div`
  display: flex;
`;

const StyledAppBody = styled.div`
  padding: var(--spacing-large) var(--spacing-xlarge);
`;

function HoraeApp() {
  return (
    <StyledApp>
      <Router>
        <AppNavbar items={ITEMS} />
        <StyledAppBody>
          <Switch>
            <Route path="/calendar" component={CalendarPage} exact />
            <Route path="/todo" component={TodoPage} exact />
            <Route path="/avatar" component={AvatarPage} exact />
            <Route path="/">
              <Redirect to="/calendar" />
            </Route>
          </Switch>
        </StyledAppBody>
      </Router>
    </StyledApp>
  );
}

export default HoraeApp;
