import React from 'react';
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
import AppNavbar from 'components/HoraeApp/AppNavbar';
import Calendar from 'components/HoraeApp/Calendar';

import CalendarWeek from 'components/HoraeApp/CalendarPage/CalendarWeek';

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
<<<<<<< Updated upstream
  padding: var(--spacing-large) var(--spacing-xlarge);
=======
  padding: var(--spacing-large) var(--spacing-base);
  flex-grow: 1;
  display: flex;
  flex-direction: column;
>>>>>>> Stashed changes
`;

function HoraeApp() {
  return (
    <StyledApp>
      <Router>
        <AppNavbar items={ITEMS} />
        <StyledAppBody>
          <Switch>
            <Route path="/calendar" component={Calendar} exact />
            <Route path="/todo" exact>
              <Text weight="400" type="heading1">
                Todo
              </Text>
            </Route>
<<<<<<< Updated upstream
            <Route path="/avatar" exact>
              <Text weight="400" type="heading1">
                Avatar
              </Text>
=======
            <Route path={['/calendar', '/calendar/week']} exact>
              <CalendarPage>
                <CalendarWeek />
              </CalendarPage>
>>>>>>> Stashed changes
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
