import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CalendarEvent } from 'context/reducers/calendarReducer';

const calculatedBorder = (x: number, y: number) => {
  const xOffset = x + 250;
  const yOffset = y + 300;
  if (xOffset > window.innerWidth && yOffset > window.innerHeight) {
    return 'border-bottom-right-radius: 0px;';
  } else if (xOffset > window.innerWidth) {
    return 'border-top-right-radius: 0px;';
  } else if (yOffset > window.innerHeight) {
    return 'border-bottom-left-radius: 0px;';
  }
  return 'border-top-left-radius: 0px;';
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  :root {
    overflow: hidden;
  }
`;

const EditMenu = styled.div<{ x: number; y: number }>`
  position: fixed;
  z-index: 2;
  box-sizing: border-box;
  background-color: white;
  min-width: 25rem;
  min-height: 30rem;
  max-width: 25rem;
  max-height: 30rem;
  padding: var(--spacing-base);
  border-radius: 1rem;
  border: 1px solid var(--color-text-subtitle);
    ${(props) =>
      props.x + 250 > window.innerWidth
        ? `right: ${window.innerWidth - props.x}px;`
        : `left: ${props.x}px;`}
    ${(props) =>
      props.y + 300 > window.innerHeight
        ? `bottom: ${window.innerHeight - props.y}px;`
        : `top: ${props.y}px;`}
    ${(props) => calculatedBorder(props.x, props.y)};
`;

type CalendarEventEditMenu = {
  x: number;
  y: number;
  closeModal: () => void;
} & CalendarEvent;

function CalendarEventEditMenu({
  x,
  y,
  name,
  location,
  date,
  description,
  duration,
  closeModal,
}: CalendarEventEditMenu) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const inputDateString = new Date(date).toISOString().split('T')[0];

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget);
  };

  return (
    <>
      <Overlay onClick={closeModal} />
      <EditMenu x={x} y={y}>
        <form action="" onSubmit={handleFormSubmit}>
          <input type="text" placeholder="name" defaultValue={name} />
          <input type="text" placeholder="location" defaultValue={location} />
          <input
            type="date"
            placeholder="date"
            defaultValue={inputDateString}
          />
          <input
            type="text"
            placeholder="description"
            defaultValue={description}
          />
          <input type="text" placeholder="duration" defaultValue={duration} />
          <input type="submit" />
        </form>
      </EditMenu>
    </>
  );
}

export default CalendarEventEditMenu;
