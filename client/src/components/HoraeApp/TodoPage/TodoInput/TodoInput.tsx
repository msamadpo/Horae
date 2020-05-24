import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInputContainer = styled.div`
  margin: var(--spacing-base);
  color: blue;
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

interface ITodoInputProps {
  createNewTodo: (todoName: string) => void;
}

function TodoInput({ createNewTodo }: ITodoInputProps) {
  const [newTodoName, setNewTodoName] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const todoName = event.currentTarget.value;
    setNewTodoName(todoName);
  };

  const createTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && newTodoName) {
      createNewTodo(newTodoName);
      setNewTodoName('');
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
      {/* <button onClick={makeNewTodo}>Add Todo</button> */}
    </StyledInputContainer>
  );
}

export default TodoInput;