import React, { useState } from 'react';
import styled from 'styled-components';
import MonthHeader from 'components/HoraeApp/CalendarPage/CalendarMonth/MonthHeader';
import {
  addMonths,
  isSameMonth,
  startOfMonth,
  lastDayOfMonth,
  eachDayOfInterval,
  subDays,
  addDays,
} from 'date-fns';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MonthBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(10rem, 1fr));
  background-color: var(--color-shadow);
  grid-column-gap: 1px;
  height: 100%;
`;

const closestSundayBefore = (date: Date) => subDays(date, date.getDay());
const closestSaturdayAfter = (date: Date) => addDays(date, 6 - date.getDay());

function CalendarMonth() {
  const [date, setDate] = useState<Date>(new Date());

  const daysOfMonth = eachDayOfInterval({
    start: closestSundayBefore(startOfMonth(date)),
    end: closestSaturdayAfter(lastDayOfMonth(date)),
  });

  const changeMonth = (numMonths: number) => {
    if (numMonths === 0) {
      setDate(new Date());
    } else {
      setDate(addMonths(date, numMonths));
    }
  };

  return (
    <Container>
      <MonthHeader
        date={date}
        showBackButton={!isSameMonth(new Date(), date)}
        changeMonth={changeMonth}
      />
      <MonthBody>
        {daysOfMonth.map((day) => (
          <div
            key={day.toLocaleDateString()}
            style={{ background: 'white', padding: '1rem', marginBottom: 1 }}
          >
            {isSameMonth(day, date) ? day.getDate() : 'Not same month'}
          </div>
        ))}
      </MonthBody>
    </Container>
  );
}

export default CalendarMonth;
