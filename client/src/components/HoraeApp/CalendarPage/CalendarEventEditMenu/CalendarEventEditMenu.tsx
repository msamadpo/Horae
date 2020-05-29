import React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from 'context/reducers/calendarReducer';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const EditMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  z-index: 2;
  background-color: white;
  min-width: 25rem;
  min-height: 30rem;
  max-width: 25rem;
  max-height: 30rem;
  padding: var(--spacing-base);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 1rem;
  ${(props) =>
    props.x + 250 > window.innerWidth
      ? `right: ${window.innerWidth - props.x}px;`
      : `left: ${props.x}px;`}
  ${(props) =>
    props.y + 300 > window.innerHeight
      ? `bottom: ${window.innerHeight - props.y}px;`
      : `top: ${props.y}px;`}
`;

type CalendarEventEditMenu = {
  x: number;
  y: number;
  closeModal: () => void;
} & CalendarEvent;

function CalendarEventEditMenu({ x, y, closeModal }: CalendarEventEditMenu) {
  return (
    <>
      <Overlay onClick={closeModal} />
      <EditMenu x={x} y={y}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="location" />
        <input type="date" placeholder="date" />
        <input type="text" placeholder="description" />
        <input type="text" placeholder="duration" />
      </EditMenu>
    </>
  );
}

export default CalendarEventEditMenu;
