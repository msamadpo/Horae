import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';

import styled from 'styled-components';

interface ITodoModalProps {
  closeModal: () => void;
}

const StyledTodoListNameInput = styled.input`
  color: red;
  &::placeholder {
    color: pink;
  }
`;

const StyledTodoList = styled.div`
  display: flex;
  min-width: 20rem;
  max-width: 20rem;
  min-height: 15rem;
  max-height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const StyledTodoListBox = styled.div`
  background-color: #444;
  padding: var(--spacing-tiny);
  text-align: center;
`;

function TodoModal({ closeModal }: ITodoModalProps) {
  const { dispatch } = useContext(GlobalContext);
  const [todoListName, setTodoListName] = useState<string>('');
  const [todoListColor, setTodoListColor] = useState<string>('#ff5a5f');

  const addTaskList = (listTitle: string, color: string) => {
    dispatch({
      type: 'ADD_TASK_LIST',
      payload: {
        taskList: {
          title: listTitle,
          tasks: [],
          settings: {
            color: color,
          },
        },
      },
    });
  };

  const handleChangeName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTodoListName(event.currentTarget.value);
  };

  const saveForm = () => {
    if (todoListName !== '') {
      addTaskList(todoListName, todoListColor);
      closeModal();
    }
  };

  const handleColorChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTodoListColor(event.currentTarget.value);
  };

  return (
    <StyledTodoList
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <StyledTodoListBox>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <StyledTodoListNameInput
            type="text"
            placeholder="Todo list name"
            value={todoListName}
            onChange={handleChangeName}
            required={true}
          />
          <input
            type="color"
            onChange={handleColorChange}
            value={todoListColor}
          />
          <input type="submit" onClick={saveForm} />
        </form>
      </StyledTodoListBox>
    </StyledTodoList>
  );
}

export default TodoModal;
