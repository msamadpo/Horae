import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from 'context/reducers/calendarReducer';

const StyledMonthItem = styled.div<{ blurred: boolean }>`
  display: flex;
  padding: var(--spacing-small);
  background-color: white;
  ${(props) =>
    props.blurred &&
    `background-color: var(--color-light-gray);
     span {
       color: var(--color-text-subtitle);
     }
    `}
  position: relative;
  margin-bottom: 1px;
  min-height: 14rem;
`;

const DateNum = styled.span<{ isToday: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  font: var(--font-small);
  color: var(--color-text-subtitle);
  ${(props) => props.isToday && 'color: var(--color-primary)'};
`;

interface IMonthItem {
  date: Date;
  isSameMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

function MonthItem({ date, isSameMonth, isToday, events }: IMonthItem) {
  return (
    <StyledMonthItem blurred={!isSameMonth}>
      <DateNum isToday={isToday}>
        {!isSameMonth && date.toLocaleString('default', { month: 'short' })}{' '}
        {date.getDate()}
      </DateNum>
      {events.map((event) => (
        <span key={`month-${event.id}`}>event.name</span>
      ))}
    </StyledMonthItem>
  );
}

export default MonthItem;
