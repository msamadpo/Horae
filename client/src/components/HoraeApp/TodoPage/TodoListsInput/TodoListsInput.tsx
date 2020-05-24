import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInputContainer = styled.div`
  margin: var(--spacing-base);
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 1rem;
  padding-left: 0.8rem;
  font-size: var(--font-small);
  outline: none;
  font-family: var(--font-regular);
  width: 100%;
  background: #666;
  color: white;
`;

interface ITodoListsInputProps {
  createNewTodoList: (todoListName: string) => void;
}

function TodoListsInput({ createNewTodoList }: ITodoListsInputProps) {
  const [newTodoListsName, setNewTodoListsName] = useState<string>('');

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const todoListsName = event.currentTarget.value;
    setNewTodoListsName(todoListsName);
  };

  const createTodoLists = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && newTodoListsName) {
      createNewTodoList(newTodoListsName);
      setNewTodoListsName('');
    }
  };

  return (
    <StyledInputContainer>
      <StyledInput
        type="text"
        onChange={handleChange}
        value={newTodoListsName}
        placeholder="New todo list"
        onKeyPress={createTodoLists}
      />
    </StyledInputContainer>
  );
}

export default TodoListsInput;