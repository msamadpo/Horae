import React, { useContext } from 'react';
import styled from 'styled-components';
import GlobalContext from 'context/GlobalContext';
import Text from 'components/Common/Text';

interface ITodoItemProps {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
  removeTask: (id: string) => void;
}

const StyledTodoItemBox = styled.div`
  margin: var(--spacing-small);
  padding: var(--spacing-small);
  border-radius: 1rem;
  box-shadow: 0px 0px 10px var(--color-shadow);
  cursor: pointer;
  display: grid;
  grid-template-columns: 3rem 1fr 4rem;
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

function TodoItem({
  id,
  name,
  deadline = '',
  completed,
  removeTask,
}: ITodoItemProps) {
  const handleRemoveTask = () => {
    removeTask(id);
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
      <span onClick={handleRemoveTask}>Trash Can</span>
    </StyledTodoItemBox>
  );
}

export default TodoItem;
