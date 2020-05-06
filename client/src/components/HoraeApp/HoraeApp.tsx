import React from 'react';
import AppNavbar from 'components/HoraeApp/AppNavbar';

import calendarIcon from 'assets/img/calendar-icon.svg';

const ITEMS = [
  {
    title: 'Calendar',
    icon: calendarIcon,
  },
  {
    title: 'Todo',
    icon: calendarIcon,
  },
  {
    title: 'Avatar',
    icon: calendarIcon,
  },
];

function HoraeApp() {
  return <AppNavbar items={ITEMS} />;
}

export default HoraeApp;
