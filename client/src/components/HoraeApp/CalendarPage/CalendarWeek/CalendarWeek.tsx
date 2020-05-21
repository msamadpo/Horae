import React from 'react';
import styled from 'styled-components';
import { addDays, subDays, eachDayOfInterval } from 'date-fns';
import Text from 'components/Common/Text';
import WeekHeader from 'components/HoraeApp/CalendarPage/CalendarWeek/WeekHeader';

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
  grid-template-columns: repeat(7, 1fr);
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

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarWeek({ startDate = new Date() }: ICalendarWeekProps) {
  const lastSunday = subDays(startDate, startDate.getDay());
  const comingSaturday = addDays(startDate, 6 - startDate.getDay());
  const currentDates = eachDayOfInterval({
    start: lastSunday,
    end: comingSaturday,
  });
  return (
    <Container>
      <WeekHeader dates={currentDates} />
      <WeekBody>
        <ColumnContainer>
          {DAYS.map((day, index) => (
            <CalendarColumns key={index}>
              <Text type="small">Display events on {day}</Text>
            </CalendarColumns>
          ))}
        </ColumnContainer>
      </WeekBody>
    </Container>
  );
}

export default CalendarWeek;
