import React, { useEffect, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import styled from 'styled-components';
import { CalendarEvent } from 'context/reducers/calendarReducer';
import { addHours } from 'date-fns';

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

const EditMenu = styled.form<{ x: number; y: number }>`
  position: fixed;
  z-index: 2;
  box-sizing: border-box;
  background-color: white;
  min-width: 25rem;
  min-height: 30rem;
  max-width: min-content;
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
  calendarId: string;
  closeModal: () => void;
} & CalendarEvent;

function CalendarEventEditMenu({
  x,
  y,
  name,
  id,
  location,
  date,
  description,
  duration,
  calendarId,
  closeModal,
}: CalendarEventEditMenu) {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inputs: HTMLInputElement[] = Array.from(
      event.currentTarget.getElementsByTagName('input')
    );
    const formData = {};
    inputs.forEach((input) => {
      if (input.type !== 'submit') {
        const { name, value } = input;
        if (input.type === 'datetime-local') {
          (formData as any)[name] = new Date(value).toString();
        } else (formData as any)[name] = value;
      }
    });
    console.log(formData);
    dispatch({
      type: 'EDIT_CALENDAR_EVENT',
      payload: {
        calendarId: calendarId,
        eventId: id,
        event: formData,
      },
    });
  };

  const isoStr = addHours(
    new Date(date),
    -new Date().getTimezoneOffset() / 60
  ).toISOString();

  return (
    <>
      <Overlay onClick={closeModal} />
      <EditMenu x={x} y={y} onSubmit={handleFormSubmit} action="">
        <input type="text" placeholder="name" name="name" defaultValue={name} />
        <input
          type="text"
          placeholder="location"
          name="location"
          defaultValue={location}
        />
        <input
          type="datetime-local"
          placeholder="date"
          name="date"
          defaultValue={isoStr.substring(0, isoStr.length - 1)}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          defaultValue={description}
        />
        <input
          type="text"
          placeholder="duration"
          name="duration"
          defaultValue={duration}
        />
        <input type="submit" />
      </EditMenu>
    </>
  );
}

export default CalendarEventEditMenu;
