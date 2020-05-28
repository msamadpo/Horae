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
  transition: all 0.2s;
  border: 3px solid transparent;
  cursor: pointer;
  &:hover {
    border-color: var(--color-text-subtitle);
  }
`;

function CalendarEventItem({
  name,
  date,
  color,
  duration,
}: CalendarEventItemProps) {
  const currDate = new Date(Date.parse(date));
  const startTime = currDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const endTime = add(currDate, {
    hours: duration,
  }).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <StyledItem color={color}>
      <Text color="white" type="regular" weight="400">
        {name}
      </Text>
      <div>
        <Text
          color="white"
          type="tiny"
          weight="300"
          styleProp="font-size: 1.2rem;"
        >
          {startTime} - {endTime}
        </Text>
      </div>
    </StyledItem>
  );
}

export default CalendarEventItem;
