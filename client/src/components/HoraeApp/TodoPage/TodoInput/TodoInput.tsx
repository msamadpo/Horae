import React, { useState } from 'react';
import styled from 'styled-components';

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
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-small);
  border-bottom: 1px solid var(--color-nav-item-text);
  width: 100%;
  color: var(--color-text-subtitle);
`;

interface ITodoInputProps {
  createNewTodo: (todoName: string, deadline: string) => void;
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
    setNewDeadline(deadline);
  };

  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && newTodoName && newDeadline) {
      //deadline is optional
      createNewTodo(newTodoName, newDeadline);
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
        onKeyPress={() => false}
        onChange={handleDeadline}
        value={newDeadline}
      />
    </StyledInputContainer>
  );
}

export default TodoInput;
