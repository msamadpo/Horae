import React, { useState } from 'react';
import useCalendarEvents from 'hooks/useCalendarEvents';
import styled from 'styled-components';
import {
  addDays,
  subDays,
  eachDayOfInterval,
  addWeeks,
  isWithinInterval,
} from 'date-fns';
import WeekHeader from 'components/HoraeApp/CalendarPage/CalendarWeek/WeekHeader';
import CalendarItem from 'components/HoraeApp/CalendarPage/CalendarWeek/CalendarEventItem';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const WeekBody = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const ColumnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(15rem, 1fr));
  height: 100%;
`;

const CalendarColumns = styled.div`
  &:not(:last-child) {
    border-right: 2px solid var(--color-bg-nav);
  }
`;

interface ICalendarWeekProps {
  startDate?: Date;
}

function CalendarWeek({ startDate = new Date() }: ICalendarWeekProps) {
  const events = useCalendarEvents();
  const [start, setStart] = useState<Date>(startDate);
  const lastSunday = subDays(start, start.getDay());
  const nextSaturday = addDays(start, 6 - start.getDay());
  const currentDates = eachDayOfInterval({
    start: lastSunday,
    end: nextSaturday,
  });

  const changeWeeks = (numWeeks: number) => {
    if (numWeeks === 0) {
      setStart(new Date());
    } else {
      setStart(addWeeks(start, numWeeks));
    }
  };

  return (
    <Container>
      <WeekHeader
        dates={currentDates}
        changeWeeks={changeWeeks}
        showBackButton={
          !isWithinInterval(new Date(), {
            start: lastSunday,
            end: nextSaturday,
          })
        }
      />
      <WeekBody>
        <ColumnContainer>
          {currentDates.map((date) => (
            <CalendarColumns key={date.toString()}>
              {events
                ?.get(date.toDateString())
                ?.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
                .map((event) => {
                  return <CalendarItem {...event} key={event.id} />;
                })}
            </CalendarColumns>
          ))}
        </ColumnContainer>
      </WeekBody>
    </Container>
  );
}

export default CalendarWeek;
