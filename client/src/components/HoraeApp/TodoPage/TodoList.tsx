import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/GlobalReducer';
import Text from 'components/Common/Text';
import TodoItem from 'components/HoraeApp/TodoPage/TodoItem';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput';
import styled from 'styled-components';

// import styles from 'components/HoraeApp/AppNavbar/AppNavItem/TodoList.module.scss';

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
  border-radius: 1rem;
  max-width: 35rem;
  overflow: hidden;
  box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.5);
`;

const Header = styled.div`
  background-color: var(--color-primary);
  padding: var(--spacing-small);
  text-align: center;
`;

function TodoList({ id, title, tasks }: ITodoProps) {
  const { dispatch } = useContext(GlobalContext);

  const addTask = (taskName: string) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: id,
        task: {
          name: taskName,
          completed: false,
        },
      },
    });
  };

  const removeTask = (taskId: string) => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        taskId: taskId,
        taskListId: id,
      },
    });
  };

  return (
    <StyledTodoList>
      <Header>
        <Text type="large" color="white" weight="500">
          {title}
        </Text>
      </Header>
      <div>
        {tasks.map((task, index) => (
          <TodoItem key={`${id}-${index}`} {...task} removeTask={removeTask} />
        ))}
        <TodoInput createNewTodo={addTask} />
      </div>
    </StyledTodoList>
  );
}

export default TodoList;
