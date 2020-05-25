import React, { useState } from 'react';
import styled from 'styled-components';
import { addHours } from 'date-fns';

const StyledInputContainer = styled.div`
  margin: var(--spacing-base);
  display: grid;
  grid-template-columns: 4fr 2fr;
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-regular);
  border-bottom: 1px solid var(--color-nav-item-text);
  width: 100%;
  color: var(--color-text-subtitle);
`;

const StyledDeadline = styled.input`
  background: transparent;
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid var(--color-nav-item-text);
  font-family: var(--font-regular);
`;

interface ITodoInputProps {
  createNewTodo: (todoName: string, deadline?: Date) => void;
}

function TodoInput({ createNewTodo }: ITodoInputProps) {
  const [newTodoName, setNewTodoName] = useState<string>('');
  const [newDeadline, setNewDeadline] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const todoName = event.currentTarget.value;
    setNewTodoName(todoName);
  };

  const handleDeadline = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const deadline = event.currentTarget.value;
    //console.log(new Date(deadline));
    setNewDeadline(deadline);
  };

  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && newTodoName) {
      const utcDate = new Date(newDeadline);
      const currentDateString = addHours(
        utcDate,
        utcDate.getTimezoneOffset() / 60
      );
      createNewTodo(newTodoName, new Date(currentDateString));
      setNewTodoName('');
      setNewDeadline('');
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type="text"
        onChange={handleChange}
        value={newTodoName}
        placeholder="Add a new Task"
        onKeyPress={createTodo}
      />
      <StyledDeadline
        type="date"
        placeholder="Deadline"
        onKeyPress={createTodo}
        onChange={handleDeadline}
        value={newDeadline}
      />
    </StyledInputContainer>
  );
}

export default TodoInput;
