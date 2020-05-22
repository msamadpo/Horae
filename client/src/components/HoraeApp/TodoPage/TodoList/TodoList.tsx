import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task, EditTaskPayload } from 'context/reducers/taskReducer';

import Text from 'components/Common/Text';
import TodoItem from 'components/HoraeApp/TodoPage/TodoItem/TodoItem';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput/TodoInput';
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
  max-width: 36rem;
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

  const addTask = (taskName: string, deadline: string) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: id,
        task: {
          name: taskName,
          deadline: deadline,
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

  const editTask = (taskName: string, taskId: string) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskId: taskId,
        taskListId: id,
        task: {
          name: taskName,
        },
      },
    });
  };

  const completeTask = (taskId: string, completed: boolean) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskId: taskId,
        taskListId: id,
        task: {
          completed: completed,
        },
      },
    });
  };

  const editDeadline = (taskId: string, deadline: string) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskId: taskId,
        taskListId: id,
        task: {
          deadline: deadline,
        },
      },
    });
  };

  // const actualEditTask = (taskId: string, taskPayload: EditTaskPayload) => {
  //   dispatch({
  //     type: 'EDIT_TASK',
  //     payload: {
  //       taskId: taskId,
  //       taskListId: id,
  //       task: taskPayload,
  //     },
  //   });
  // }

  return (
    <StyledTodoList>
      <Header>
        <Text type="large" color="white" weight="500">
          {title}
        </Text>
      </Header>
      <div>
        {tasks.map((task, index) => (
          <TodoItem
            key={task.id}
            {...task}
            removeTask={removeTask}
            editTask={editTask}
            completeTask={completeTask}
            editDeadline={editDeadline}
          />
        ))}
        <TodoInput createNewTodo={addTask} />
      </div>
    </StyledTodoList>
  );
}

export default TodoList;
