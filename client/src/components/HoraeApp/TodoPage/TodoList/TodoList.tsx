import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/reducers/taskReducer';
import { DropResult } from 'react-beautiful-dnd';
import { EditTaskPayload } from 'context/reducers/taskReducer';
import { EditTaskListPayload } from 'context/reducers/taskListReducer';

import Text from 'components/Common/Text';
import TodoItem from 'components/HoraeApp/TodoPage/TodoItem/TodoItem';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput/TodoInput';
import styled from 'styled-components';

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// import styles from 'components/HoraeApp/AppNavbar/AppNavItem/TodoList.module.scss';

interface ITodoProps {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  tasks: Task[];
}

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

const Header = styled.div<{ color: string }>`
  background-color: ${(props) => props.color || 'var(--color-primary)'};
  padding: var(--spacing-small);
  text-align: center;
`;

function TodoList({ id, title, tasks, settings }: ITodoProps) {
  const { dispatch } = useContext(GlobalContext);
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

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

  const editTaskList = (updates: EditTaskListPayload) => {
    dispatch({
      type: 'EDIT_TASK_LIST',
      payload: { taskListId: id, updates: updates },
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
  //const onDragEnd = result => {
  //reorder columns]
  //};

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const newState = [...taskList];
    const a = newState.splice(source.index, 1);
    newState.splice(destination.index, 0, ...a);
    setTaskList(newState);
    editTaskList({ tasks: newState });
  };

  return (
    <StyledTodoList>
      <Header color={settings.color}>
        <Text type="large" color="white" weight="500">
          {title}
        </Text>
      </Header>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided) => (
            <StyledTodoListBody
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {taskList.map((task, index) => (
                <TodoItem
                  key={task.id}
                  {...task}
                  removeTask={removeTask}
                  editTask={editTask}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </StyledTodoListBody>
          )}
        </Droppable>
      </DragDropContext>
      <TodoInput createNewTodo={addTask} />
    </StyledTodoList>
  );
}

export default TodoList;
