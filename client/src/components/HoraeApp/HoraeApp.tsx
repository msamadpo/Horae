import React from 'react';
import AppNavbar from 'components/HoraeApp/AppNavbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import calendarIcon from 'assets/img/calendar-icon.svg';
import Text from 'components/Common/Text';

const StyledApp = styled.div`
  display: flex;
`;

const ITEMS = [
  {
    title: 'Calendar',
    icon: calendarIcon,
    to: '/calendar',
  },
  {
    title: 'Todo',
    icon: calendarIcon,
    to: '/todo',
  },
  {
    title: 'Avatar',
    icon: calendarIcon,
    to: '/avatar',
  },
];

function HoraeApp() {
  return (
    <StyledApp>
      <Router>
        <AppNavbar items={ITEMS} />
        <Switch>
          <Route path="/calendar" exact>
            <Text type="heading1">Calendar</Text>
          </Route>
          <Route path="/todo" exact>
            <Text type="heading1">Todo</Text>
          </Route>
          <Route path="/avatar" exact>
            <Text type="heading1">Avatar</Text>
          </Route>
        </Switch>
      </Router>
    </StyledApp>
  );
}

export default HoraeApp;
