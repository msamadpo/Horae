import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';
import { EditTaskPayload } from 'context/reducers/taskReducer';

interface ITodoItemProps {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
  removeTask: (id: string) => void;
  editTask: (taskId: string, updates: EditTaskPayload) => void;
}

const StyledTodoItemBox = styled.div<{ completed: boolean }>`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 4fr 2.5fr 5rem;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
  transition: background-color 0.4s;
  ${(props) =>
    props.completed &&
    `background-color: #e8e8e8;
         box-shadow: 0px 0px 0px;`}
  &:hover {
    .icon-container {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const StyledCompleteButton = styled.div<{ completed: boolean }>`
  min-width: 2.25rem;
  max-width: 2.25rem;
  min-height: 2.25rem;
  max-height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-nav-item-text);
  ${(props) =>
    props.completed &&
    `background-color:#c1bfbf;
   border: none;
   transition: 0.4s;`}
`;
const StyledCheckmark = styled.svg<{ completed: boolean }>`
  fill: none;
  ${(props) =>
    props.completed &&
    `stroke: white; 
    stroke-width: 2px;
    transition: 0.4s;`}
`;

const StyledInput = styled.input<{ completed: boolean }>`
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-regular);
  border-bottom: 2px solid var(--color-primary);
  width: 100%;
  color: var(--color-text-subtitle);
  ${(props) =>
    props.completed &&
    `background-color: transparent;
    color: white;`}
`;

const StyledLineThrough = styled.span<{ completed: boolean }>`
  position: relative;
  width: max-content;
  ${(props) =>
    props.completed &&
    `
  &::after {
    max-width: 100%;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    position: absolute;
    background-color: var(--color-text-subtitle);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`}
`;

const StyledDeadline = styled.input<{ completed: boolean }>`
  border: none;
  font-size: 1rem;
  outline: none;
  font-family: var(--font-small);
  border-bottom: 2px solid var(--color-primary);
  width: 100%;
  color: var(--color-text-subtitle);
  padding-bottom: 11px;
  ${(props) => props.completed && `background-color: transparent`}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  visibility: hidden;
  transition: opacity 0.5s;
  opacity: 0;
`;

function TodoItem({
  id,
  name,
  deadline = '',
  completed,
  removeTask,
  editTask,
}: ITodoItemProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedName, setEditedName] = useState<string>(name);
  const [editedDeadline, setEditedDeadline] = useState<string>(deadline);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleRemoveTask = () => {
    removeTask(id);
  };

  const handleEditName = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setEditedName(event.currentTarget.value);
  };

  const submitEdits = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      setIsEditing(false);
      if (editedName === '') {
        setEditedName(name);
      } else {
        editTask(id, {
          name: editedName,
          deadline: editedDeadline,
        });
      }
    }
  };

  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const clickedOnInput = event?.relatedTarget instanceof HTMLInputElement;
    if (clickedOnInput) {
      return;
    }
    if (editedName === '') {
      setEditedName(name);
    } else if (editedDeadline === '') {
      setEditedDeadline(deadline);
    } else if (editedName !== name && editedDeadline !== deadline) {
      editTask(id, { name: editedName, deadline: editedDeadline });
    } else if (editedDeadline !== deadline) {
      editTask(id, { deadline: editedDeadline });
    } else if (editedName !== name) {
      editTask(id, { name: editedName });
    }
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCompleted = () => {
    editTask(id, {
      completed: !completed,
    });
  };

  const handleDeadlineName = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setEditedDeadline(event.currentTarget.value);
  };

  return (
    <StyledTodoItemBox completed={completed}>
      <StyledCompleteButton completed={completed} onClick={handleCompleted}>
        <StyledCheckmark viewBox="0 0 24 24" completed={completed}>
          <polyline points="20 6 9 17 4 12" />
        </StyledCheckmark>
      </StyledCompleteButton>
      {isEditing ? (
        <StyledInput
          type="text"
          onChange={handleEditName}
          value={editedName}
          onKeyPress={submitEdits}
          onBlur={onBlurHandler}
          ref={inputRef}
          completed={completed}
        />
      ) : (
        <StyledLineThrough completed={completed}>
          <Text
            type="small"
            color={completed ? 'var(--color-text-subtitle)' : ''}
          >
            {name}
          </Text>
        </StyledLineThrough>
      )}
      {isEditing ? (
        <StyledDeadline
          type="text"
          onChange={handleDeadlineName}
          value={editedDeadline}
          onKeyPress={submitEdits}
          onBlur={onBlurHandler}
          ref={inputRef}
          completed={completed}
        />
      ) : (
        <Text type="tiny">{deadline}</Text>
      )}

      <IconContainer className={isEditing ? '' : 'icon-container'}>
        <span onClick={handleRemoveTask}>
          <Icon type="trash" white={false} height={20} />
        </span>
        <span onClick={toggleEditMode}>
          <Icon type="edit" white={false} height={20} />
        </span>
      </IconContainer>
    </StyledTodoItemBox>
  );
}

export default TodoItem;
