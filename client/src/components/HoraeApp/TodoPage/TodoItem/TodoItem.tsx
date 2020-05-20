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
}

const StyledTodoItemBox = styled.div<{ completed: boolean }>`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  cursor: pointer;
  display: grid;
  grid-template-columns: 3rem 1fr 6rem;
  align-items: center;
  grid-column-gap: var(--spacing-tiny);
  ${(props) =>
    props.completed ? `background-color: var(--color-shadow);` : ''}
  &:hover {
    .icon-container {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const CompleteButton = styled.div`
  min-width: 2.25rem;
  max-width: 2.25rem;
  min-height: 2.25rem;
  max-height: 2.25rem;
  border-radius: 50%;
  border: 1px solid var(--color-nav-item-text);
`;

const StyledInput = styled.input`
  border: none;
  font-size: 1.75rem;
  outline: none;
  font-family: var(--font-regular);
  border-bottom: 2px solid var(--color-primary);
  width: 100%;
  color: var(--color-text-subtitle);
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
    if (keyCode === 13  && editedName !== '') {
      editTask(editedName, id);
      setIsEditing(false);
    }
    if (keyCode === 13  && editedName === '') {
      editTask(name, id);
      setIsEditing(false);
      setEditedName(name);
    }
  };

  const onBlurEditName = () => {
    if (editedName === '') {
      editTask(name, id);
      setIsEditing(false);
      setEditedName(name);
    } else{
      editTask(editedName, id);
      setIsEditing(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <StyledTodoItemBox completed={completed}>
      <CompleteButton />
      {isEditing ? (
        <StyledInput
          type="text"
          onChange={handleEditName}
          value={editedName}
          onKeyPress={submitEditName}
          onBlur={onBlurEditName}
          ref={inputRef}
        />
      ) : (
        <Text
          type="small"
          styleProp={`text-decoration: ${completed ? 'line-through' : 'unset'}`}
        >
          {name}
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
