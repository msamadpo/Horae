import React from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import { CalendarEvent } from 'context/reducers/calendarEventReducer';
import { add } from 'date-fns';

export type CalendarEventItemProps = CalendarEvent & { color: string };

const StyledItem = styled.div<{ color: string }>`
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(${(props) => props.color});
  margin: 1rem;
`;

function CalendarEventItem(props: CalendarEventItemProps) {
  const date = new Date(Date.parse(props.date));
  const startTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const endTime = add(date, {
    hours: props.duration,
  }).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <StyledItem
      color={'--color-primary-' + `${Math.floor(Math.random() * 7) + 1}`}
    >
      <Text color="white" type="regular" weight="400">
        {props.name}
      </Text>
      <div>
        <Text color="white" type="tiny" weight="300">
          {startTime} - {endTime}
        </Text>
      </div>
    </StyledItem>
  );
}

export default CalendarEventItem;
