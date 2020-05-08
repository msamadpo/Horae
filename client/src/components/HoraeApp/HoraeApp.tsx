import React from 'react';
import AppNavbar from 'components/HoraeApp/AppNavbar';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import styled from 'styled-components';
import calendarIcon from 'assets/img/calendar-icon.svg';
import todoIcon from 'assets/img/todo-icon.svg';
import userIcon from 'assets/img/user-icon.svg';
import Text from 'components/Common/Text';

const ITEMS = [
  {
    title: 'Calendar',
    icon: calendarIcon,
    to: '/calendar',
  },
  {
    title: 'Todo',
    icon: todoIcon,
    to: '/todo',
  },
  {
    title: 'Avatar',
    icon: userIcon,
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
            <Route path="/calendar" exact>
              <Text weight="400" type="heading1">
                Calendar
              </Text>
            </Route>
            <Route path="/todo" exact>
              <Text weight="400" type="heading1">
                Todo
              </Text>
            </Route>
            <Route path="/avatar" exact>
              <Text weight="400" type="heading1">
                Avatar
              </Text>
            </Route>
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
