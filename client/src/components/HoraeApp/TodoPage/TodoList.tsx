import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/GlobalReducer';
import TodoItem from 'components/HoraeApp/TodoPage/TodoItem';
import styled from 'styled-components';

import styles from 'components/HoraeApp/AppNavbar/AppNavItem/TodoList.module.scss';

interface ITodoProps {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  tasks: Task[];
}

// TODO: Remove this code once it's no longer needed as a reference
const StyledTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50rem;
  max-height: 50rem;
  min-width: 50rem;
  max-width: 50rem;
  background-color: var(--color-bg-light);
  margin: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.2);
  transition: all 0.2s;
`;

const Title = styled.header`
  font: var(--font-regular);

  position: realtive;
  top: 50;
`;

function TodoList({ id, title, settings, tasks }: ITodoProps) {
  return (
    <StyledTodoList>
      <Title>{title}</Title>
      {tasks.map((task, index) => (
        <TodoItem key={`${id}-${index}`} {...task} />
      ))}
    </StyledTodoList>
  );
}

export default TodoList;
