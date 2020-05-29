import React from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';

const CalendarDays = styled.div`
  margin-top: var(--spacing-tiny);
  display: grid;
  grid-template-columns: repeat(7, minmax(15rem, 1fr));
  grid-template-rows: 5rem;
  align-items: center;
  background-color: var(--color-bg-nav);
  padding: var(--spacing-tiny) 0;
  border-radius: 1.5rem;
  text-align: center;
`;

const StyledTodayButton = styled.div`
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  background: var(--color-bg-nav);
  color: var(--color-text-subtitle);
`;

const MonthToggler = styled.span`
  display: grid;
  grid-template-columns: 3rem 18rem 3rem 12rem;
  align-items: center;
  justify-items: center;
`;

interface IMonthHeader {
  date: Date;
  showBackButton?: boolean;
  changeMonth: (numMonths: number) => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function MonthHeader({
  date,
  showBackButton = false,
  changeMonth,
}: IMonthHeader) {
  const month = date.toLocaleString('default', { month: 'long' });

  return (
    <>
      <MonthToggler>
        <Icon type="chevron-left" height={20} onClick={() => changeMonth(-1)} />
        <Text type="large">{month}</Text>
        <Icon type="chevron-right" height={20} onClick={() => changeMonth(1)} />
        {showBackButton && (
          <StyledTodayButton onClick={() => changeMonth(0)}>
            <Text type="tiny">This Month</Text>
          </StyledTodayButton>
        )}
      </MonthToggler>
      <CalendarDays>
        {DAYS.map((day) => (
          <Text type="small" key={day}>
            {day}
          </Text>
        ))}
      </CalendarDays>
    </>
  );
}

export default MonthHeader;
