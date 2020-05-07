import React from 'react';
import AppNavbar from 'components/HoraeApp/AppNavbar';

import calendarIcon from 'assets/img/calendar-icon.svg';

const ITEMS = [
  {
    title: 'Luke',
    icon: calendarIcon,
  },
  {
    title: 'the',
    icon: calendarIcon,
  },
  {
    title: 'Duke',
    icon: calendarIcon,
  },
];

function HoraeApp() {
  return <AppNavbar items={ITEMS} />;
}

export default HoraeApp;
