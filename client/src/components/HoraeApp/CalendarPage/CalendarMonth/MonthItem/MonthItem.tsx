import React, { useState } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import { CalendarEventItemType } from 'hooks/useCalendarEvents';
import CalendarEventEditMenu from 'components/HoraeApp/CalendarPage/CalendarEventEditMenu';

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
  events?: CalendarEventItemType[];
}

function MonthItem({ date, isSameMonth, isToday, events }: IMonthItem) {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [clickCoordinates, setClickCoordinates] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const toggleMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setShowMenu(!showMenu);
    setClickCoordinates({ x: clientX, y: clientY });
  };

  return (
    <StyledMonthItem blurred={!isSameMonth}>
      <DateNum isToday={isToday}>
        {!isSameMonth && date.toLocaleString('default', { month: 'short' })}{' '}
        {date.getDate()}
      </DateNum>
      {events?.map(
        ({ id, name, description, duration, date, color, location }) => (
          <div key={`month-${id}`}>
            {showMenu && (
              <CalendarEventEditMenu
                id={id}
                name={name}
                description={description}
                date={date}
                duration={duration}
                location={location}
                x={clickCoordinates.x}
                y={clickCoordinates.y}
                closeModal={() => setShowMenu(false)}
              />
            )}
            <StyledEvent color={color} onClick={toggleMenu}>
              <Text type="small" color="white">
                {name}
              </Text>
            </StyledEvent>
          </div>
        )
      )}
    </StyledMonthItem>
  );
}

export default MonthItem;
