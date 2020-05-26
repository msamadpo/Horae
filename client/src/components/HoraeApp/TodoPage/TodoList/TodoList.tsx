import React, { useState, useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/reducers/taskReducer';
import { EditTaskPayload } from 'context/reducers/taskReducer';

import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
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

const StyledInput = styled.input`
  border: none;
`;

const StyledTodoList = styled.div`
  display: flex;
  margin: var(--spacing-base);
  flex-direction: column;
  border-radius: 1rem;
  max-width: 36rem;
  overflow: hidden;
  box-shadow: 0px 2px 16px 0px rgba(219, 219, 219, 0.5);
  max-height: 75rem;
`;

const StyledTodoListBody = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    background-color: rgba(0, 0, 0, 0.03);
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: #eaeaea;
  }
`;

const IconContainer = styled.div`
  padding: var(--spacing-medium);
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: transparent;
`;

const Header = styled.div<{ color: string }>`
  display: grid;
  grid-template-columns: 1fr 3rem;
  background-color: ${(props) => props.color || 'var(--color-primary)'};
  padding: var(--spacing-small);
  text-align: center;
  position: relative;
`;

function TodoList({ id, title, tasks, settings }: ITodoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(title);
  const { dispatch } = useContext(GlobalContext);

  const addTask = (taskName: string, deadline?: Date) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: id,
        task: {
          name: taskName,
          deadline: deadline?.toString() || '',
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

  const editTask = (taskId: string, updates: EditTaskPayload) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskId: taskId,
        taskListId: id,
        task: updates,
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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleRemoveTask = () => {
    removeTask(id);
  };

  const handleEditName = () => {
    setEditedName('');
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
  //const onDragEnd = result => {
  //reorder columns]
  //};

  return (
    <StyledTodoList>
      <Header color={settings.color}>
        <Text type="large" color="white" weight="500">
          {title}
        </Text>
        <Icon type="kebab" white={false} height={20} onClick={toggleEditMode} />
        {isEditing && (
          <IconContainer>
            <Icon
              type="trash"
              white={false}
              height={20}
              {...handleRemoveTask}
            />
            <Icon
              type="edit"
              white={false}
              height={20}
              onClick={handleEditName}
            />
            <Icon type="paint" white={false} height={20} />
            <Icon
              type="exit"
              white={false}
              height={20}
              onClick={toggleEditMode}
            />
          </IconContainer>
        )}
      </Header>
      <StyledTodoListBody>
        {tasks.map((task, index) => (
          <TodoItem
            key={task.id}
            {...task}
            removeTask={removeTask}
            editTask={editTask}
          />
        ))}
      </StyledTodoListBody>
      <TodoInput createNewTodo={addTask} />
    </StyledTodoList>
  );
}

export default TodoList;
