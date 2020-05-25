import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import {
  addDays,
  subDays,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
  isBefore,
} from 'date-fns';
import WeekHeader from 'components/HoraeApp/CalendarPage/CalendarWeek/WeekHeader';
import { CalendarEvent, Calendar } from 'context/reducers/calendarEventReducer';
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

type CalendarEventItemType = CalendarEvent & { color: string };

const indexEventsByDate = (calendars: Calendar[]) => {
  const indexedEvents = new Map<string, CalendarEventItemType[]>();
  calendars.forEach((calendar) => {
    calendar.events.forEach((event) => {
      const dateKey = new Date(Date.parse(event.date)).toDateString();
      if (indexedEvents.has(dateKey)) {
        indexedEvents
          .get(dateKey)
          ?.push({ ...event, color: calendar.settings.color });
      } else {
        indexedEvents.set(dateKey, [
          { ...event, color: calendar.settings.color },
        ]);
      }
    });
  });
  return indexedEvents;
};

function CalendarWeek({ startDate = new Date() }: ICalendarWeekProps) {
  const { data } = useContext(GlobalContext);
  const [start, setStart] = useState<Date>(startDate);
  const currentDates = eachDayOfInterval({
    start: subDays(start, start.getDay()),
    end: addDays(start, 6 - start.getDay()),
  });

  const [indexedEvents, setIndexedEvents] = useState<
    Map<string, CalendarEventItemType[]>
  >(indexEventsByDate(data.calendars));

  useEffect(() => {
    console.log('Getting recalculated');
    setIndexedEvents(indexEventsByDate(data.calendars));
  }, [data, data.calendars]);

  const changeWeeks = (numWeeks: number) => {
    if (numWeeks == 0) {
      setStart(startDate);
    }
    setStart(addWeeks(start, numWeeks));
  };

  return (
    <Container>
      <WeekHeader dates={currentDates} changeWeeks={changeWeeks} />
      <WeekBody>
        <ColumnContainer>
          {currentDates.map((date) => (
            <CalendarColumns key={date.toString()}>
              {indexedEvents
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
