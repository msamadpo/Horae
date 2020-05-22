import React from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import { isToday } from 'date-fns';

const Today = styled.span<{ active: boolean }>`
  ${(props) =>
    props.active &&
    `min-width: 3.5rem;
  max-width: 3.5rem;
  min-height: 3.5rem;
  max-height: 3.5rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  display: grid;
  place-items: center;`}
  font-size: 1.5rem;
  margin-left: var(--spacing-tiny);
`;

const CalendarDays = styled.div`
  margin-top: var(--spacing-tiny);
  display: grid;
  grid-template-columns: repeat(7, minmax(15rem, 1fr));
  align-items: center;
  background-color: var(--color-bg-nav);
  padding: var(--spacing-small) 0;
  border-radius: 1.5rem;
`;

const DayDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface IWeekHeader {
  dates: Date[];
}
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function WeekHeader({ dates }: IWeekHeader) {
  return (
    <div>
      <Text type="large" styleProp="margin-left: 6px;">
        {dates[0].toLocaleString('default', { month: 'long' })}{' '}
        {dates[0].getFullYear()}
      </Text>
      <CalendarDays>
        {dates.map((date, index) => (
          <DayDateContainer key={date.toString()}>
            <Text type="small">{DAYS[index % DAYS.length]}</Text>
            <Today active={isToday(date)}>
              <Text type="small" color={isToday(date) ? 'white' : ''}>
                {date.getDate()}
              </Text>
            </Today>
          </DayDateContainer>
        ))}
      </CalendarDays>
    </div>
  );
}

export default WeekHeader;
