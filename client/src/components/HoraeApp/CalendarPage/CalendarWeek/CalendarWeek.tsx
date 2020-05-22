import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import {
  addDays,
  subDays,
  eachDayOfInterval,
  isSameDay,
  addWeeks,
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

const indexEventsByDate = (currentDates: Date[], calendars: Calendar[]) => {
  const indexedEvents = new Map<string, CalendarEventItemType[]>();
  calendars.forEach((calendar) => {
    calendar.events.forEach((event) => {
      const date = currentDates.filter((date) =>
        isSameDay(date, Date.parse(event.date))
      )[0];
      const dateKey = date?.toString() || 'other';
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
  const [start, setStart] = useState<Date>(startDate);
  const lastSunday = subDays(start, start.getDay());
  const comingSaturday = addDays(start, 6 - start.getDay());
  const currentDates = eachDayOfInterval({
    start: lastSunday,
    end: comingSaturday,
  });
  const { data } = useContext(GlobalContext);
  const [indexedEvents, setIndexedEvents] = useState<
    Map<string, CalendarEventItemType[]>
  >(indexEventsByDate(currentDates, data.calendars));

  useEffect(() => {
    setIndexedEvents(indexEventsByDate(currentDates, data.calendars));
  }, [data, data.calendars]);

  const changeWeeks = (numWeeks: number) => {
    setStart(addWeeks(start, numWeeks));
  };

  return (
    <Container>
      <WeekHeader dates={currentDates} changeWeeks={changeWeeks} />
      <WeekBody>
        <ColumnContainer>
          {currentDates.map((date, index) => (
            <CalendarColumns key={date.toString()}>
              {indexedEvents?.get(date.toString())?.map((event) => (
                <CalendarItem {...event} key={event.id} />
              ))}
            </CalendarColumns>
          ))}
        </ColumnContainer>
      </WeekBody>
    </Container>
  );
}

export default CalendarWeek;
