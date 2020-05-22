import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';

interface ITodoItemProps {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
  removeTask: (id: string) => void;
  editTask: (taskName: string, id: string) => void;
  completeTask: (taskid: string, completed: boolean) => void;
  editDeadline: (taskid: string, deadline: string) => void;
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
  ${(props) =>
    props.completed
      ? `background-color: var(--color-shadow);box-shadow: 0px 0px 0px;`
      : ''}
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
    props.completed
      ? `background-color:#c1bfbf;
   border: none;
   transition: 1.5s;
  `
      : ''}
`;
const StyledCheckmark = styled.svg<{ completed: boolean }>`
  fill: none;
  ${(props) =>
    props.completed ? ` stroke: white; stroke-width: 2px;transition: 1s;` : ''}
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
    props.completed ? `background-color: transparent; color:white;` : ''}
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
  ${(props) => (props.completed ? `background-color: transparent` : '')}
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
  completeTask,
  editDeadline,
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

  const submitEditName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && editedName !== '') {
      editTask(editedName, id);
      setIsEditing(false);
    }
    if (keyCode === 13 && editedName === '') {
      editTask(name, id);
      setIsEditing(false);
      setEditedName(name);
    }
  };

  const onBlurEditName = (event: React.FocusEvent<HTMLInputElement>) => {
    const clickedOnInput = event?.relatedTarget instanceof HTMLInputElement;
    if (clickedOnInput) {
      return;
    }
    if (editedName === '') {
      editTask(name, id);
      setIsEditing(false);
      setEditedName(name);
    } else {
      editTask(editedName, id);
      setIsEditing(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const handleCompleted = () => {
    completeTask(id, !completed);
  };

  const handleDeadlineName = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setEditedDeadline(event.currentTarget.value);
  };

  const submitEditDeadline = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13) {
      editDeadline(id, editedDeadline);
      setIsEditing(false);
    }
  };

  const onBlurDeadline = (event: React.FocusEvent<HTMLInputElement>) => {
    const clickedOnInputName = event?.relatedTarget instanceof HTMLInputElement;
    if (clickedOnInputName) {
      return;
    }
    if (editedDeadline === '') {
      editDeadline(id, deadline);
      setEditedDeadline(deadline);
      setIsEditing(false);
    }
    setIsEditing(false);
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
          onKeyPress={submitEditName}
          onBlur={onBlurEditName}
          ref={inputRef}
          completed={completed}
        />
      ) : (
        <Text
          type="small"
          styleProp={`${
            completed
              ? ' font-weight:400; color:#444444; opacity: 0.3;'
              : 'unset'
          }`}
        >
          {name}
        </Text>
      )}
      {isEditing ? (
        <StyledDeadline
          type="text"
          onChange={handleDeadlineName}
          value={editedDeadline}
          onKeyPress={submitEditDeadline}
          onBlur={onBlurDeadline}
          ref={inputRef}
          completed={completed}
        />
      ) : (
        <Text
          type="tiny"
          styleProp={`${
            completed
              ? ' font-weight:100; color:grey; opacity:0.40;'
              : 'opacity:0.80;'
          }`}
        >
          {deadline}
        </Text>
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
