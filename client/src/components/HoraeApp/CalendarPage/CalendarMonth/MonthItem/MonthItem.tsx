import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import { CalendarEventItemType } from 'hooks/useCalendarEvents';
import CalendarEventEditMenu from 'components/HoraeApp/CalendarPage/CalendarEventEditMenu';
import { compareAsc } from 'date-fns';

const StyledMonthItem = styled.div<{ blurred: boolean }>`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-base) var(--spacing-small) var(--spacing-small);
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
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
  }
  cursor: pointer;
`;

const DateNum = styled.span<{ isToday: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  font: var(--font-small);
  color: var(--color-text-subtitle);
  ${(props) => props.isToday && 'color: var(--color-primary)'};
`;

const StyledEvent = styled.div<{ color: string }>`
  background-color: var(${(props) => props.color});
  padding: 5px var(--spacing-small);
  margin-top: var(--spacing-tiny);
  border-radius: 2rem;
  cursor: pointer;
  border: 3px solid transparent;
  transition: border-color 0.2s;
  &:hover {
    border-color: var(--color-text-subtitle);
  }
`;

interface IMonthItem {
  date: Date;
  isSameMonth: boolean;
  isToday: boolean;
  events: CalendarEventItemType[];
}

function MonthItem({ date, isSameMonth, isToday, events }: IMonthItem) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [editMenuData, setEditMenuData] = useState<CalendarEventItemType>(
    events?.[0]
  );
  const [clickCoordinates, setClickCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const toggleMenu = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    event.stopPropagation();
    const { clientX, clientY } = event;
    setShowMenu(!showMenu);
    setClickCoordinates({ x: clientX, y: clientY });
    setEditMenuData(events?.[index]);
  };

  return (
    <StyledMonthItem blurred={!isSameMonth}>
      {showMenu && (
        <CalendarEventEditMenu
          {...editMenuData}
          x={clickCoordinates.x}
          y={clickCoordinates.y}
          closeModal={() => setShowMenu(false)}
        />
      )}
      <DateNum isToday={isToday}>
        {!isSameMonth && date.toLocaleString('default', { month: 'short' })}{' '}
        {date.getDate()}
      </DateNum>
      {events
        ?.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
        .map(({ id, name, color }, index) => (
          <StyledEvent
            color={color}
            onClick={(e) => {
              toggleMenu(e, index);
            }}
            key={`month-${id}`}
          >
            <Text type="small" color="white">
              {name}
            </Text>
          </StyledEvent>
        ))}
    </StyledMonthItem>
  );
}

export default MonthItem;
