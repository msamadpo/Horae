import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task } from 'context/reducers/taskReducer';
import { DropResult } from 'react-beautiful-dnd';
import { EditTaskPayload } from 'context/reducers/taskReducer';
import { EditTaskListPayload } from 'context/reducers/taskListReducer';

import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
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
  overflow-x: hidden;
  &::-webkit-scrollbar {
    background-color: rgba(0, 0, 0, 0.03);
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2rem;
    background-color: #eaeaea;
  }
`;

const EditMenu = styled.div`
  padding: var(--spacing-small);
  position: absolute;
  right: 25px;
  top: 25px;
  z-index: 1;
  background-color: white;
  border-radius: 1rem;
  border-top-right-radius: 1px;
  border: 1px solid var(--color-shadow);
  box-shadow: 2px 5px 10px #999;
  max-width: 20rem;
`;

const ColorPickerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: var(--spacing-tiny) 0;
  cursor: pointer;
`;

const COLORS = [
  '--color-primary-1',
  '--color-primary-2',
  '--color-primary-3',
  '--color-primary-4',
  '--color-primary-5',
  '--color-primary-6',
  '--color-primary-7',
  '--color-primary',
];

const ColorPickerOption = styled.div<{ color: string; selected: boolean }>`
  background-color: var(${(props) => props.color});
  transition: border 0.2s;
  ${(props) => props.selected && `border: 2px solid #333;`}
  box-sizing: border-box;
  min-width: 3rem;
  max-width: 3rem;
  min-height: 3rem;
  max-height: 3rem;
  border-radius: 50%;
  margin: 5px;
`;

const Header = styled.div<{ color: string }>`
  display: grid;
  grid-template-columns: 1fr 3rem;
  background-color: var(${(props) => props.color}, blue);
  padding: var(--spacing-small);
  text-align: center;
  align-items: center;
  position: relative;
`;

const DeleteButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-primary);
  border-radius: 6px;
  padding: 5px 10px;
  transition: all 0.2s;
  &:hover {
    background-color: var(--color-primary);
    span {
      color: white !important;
    }
  }
`;

function TodoList({ id, title, tasks, settings }: ITodoProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { dispatch } = useContext(GlobalContext);

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

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const editTaskList = (updates: EditTaskListPayload) => {
    dispatch({
      type: 'EDIT_TASK_LIST',
      payload: { taskListId: id, updates: updates },
    });
  };

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
        <div>
          <Icon
            type="kebab"
            white={false}
            height={20}
            onClick={toggleEditMode}
          />
          {isEditing || (
            <EditMenu>
              <input type="text" value={title} />
              <ColorPickerContainer>
                {COLORS.map((color) => (
                  <ColorPickerOption
                    color={color}
                    selected={settings.color === color}
                  />
                ))}
              </ColorPickerContainer>
              <DeleteButton>
                <Text
                  type="small"
                  color="var(--color-primary)"
                  margins={['none', 'none', 'none', 'tiny']}
                >
                  Delete List
                </Text>
              </DeleteButton>
            </EditMenu>
          )}
        </div>
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
