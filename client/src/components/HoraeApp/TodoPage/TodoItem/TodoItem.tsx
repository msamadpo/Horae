import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import GlobalContext from 'context/GlobalContext';
import Text from 'components/Common/Text';
import Icon from 'components/Common/Icon';

interface ITodoItemProps {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
  removeTask: (id: string) => void;
  editTask:(taskName:string,id:string) => void;
}

const StyledTodoItemBox = styled.div`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  cursor: pointer;
  display: grid;
  grid-template-columns: 3rem 3fr 4rem 2rem;
  grid-column-gap: var(--spacing-tiny);
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
  width: 100%;
  color: var(--color-text-subtitle);
`;

function TodoItem({
  id,
  name,
  deadline = '',
  completed,
  removeTask,
  editTask,
}: ITodoItemProps) {
  const [editTodoName, setTodoName] = useState<string>('');

  const handleRemoveTask = () => {
    removeTask(id);
  };

  const handleEditTask = () => {
    editTask('here',id);
  };

  return (
    <StyledTodoItemBox>
      <CompleteButton />
      <Text
        type="small"
        styleProp={`text-decoration: ${completed ? 'line-through' : 'unset'}`}
      >
        {name}
      </Text>
      <span onClick={handleRemoveTask}> <Icon type={'trash'} white={false} height={20} /> </span>
      <span onClick={handleEditTask}><Icon type={'edit'} white={false} height={20} /></span>
    </StyledTodoItemBox>
  );
}

export default TodoItem;
