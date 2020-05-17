import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import AppNavbar from 'components/HoraeApp/AppNavbar';
import Header from 'components/HoraeApp/Header';
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
  min-height: 100vh;
`;

const StyledAppBody = styled.div`
  padding: var(--spacing-large) var(--spacing-xlarge);
  flex-grow: 1;
`;

function HoraeApp() {
  return (
    <StyledApp>
      <Router>
        <AppNavbar items={ITEMS} />
        <StyledAppBody>
          <Header />
          <Switch>
            <Route path="/calendar/day" exact>
              <CalendarPage>Day View of calendar</CalendarPage>
            </Route>
            <Route path="/calendar/month" exact>
              <CalendarPage>Month View of calendar</CalendarPage>
            </Route>
            <Route path={['/calendar', '/calendar/week']} exact>
              <CalendarPage>Week View of calendar</CalendarPage>
            </Route>
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
