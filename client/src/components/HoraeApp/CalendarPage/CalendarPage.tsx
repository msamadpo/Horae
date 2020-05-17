import React from 'react';
import { NavLink as Link } from 'react-router-dom';

interface ICalendarPageProps {
  children: React.ReactNode;
}

function CalendarPage({ children }: ICalendarPageProps) {
  return (
    <div>
      <Link to="/calendar/day">Day</Link>
      <Link to="/calendar">Week</Link>
      <Link to="/calendar/month">Month</Link>
      <div>{children}</div>
    </div>
  );
}

export default CalendarPage;
