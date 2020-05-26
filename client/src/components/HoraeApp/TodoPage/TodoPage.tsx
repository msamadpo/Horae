import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import TodoList from 'components/HoraeApp/TodoPage/TodoList/TodoList';
import TodoModal from 'components/HoraeApp/TodoPage/TodoModal/TodoModal';
import styled from 'styled-components';
import Text from 'components/Common/Text';

const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledTodoListsButton = styled.button`
  min-width: 7rem;
  min-height: 7rem;
  max-height: 7rem;
  max-width: 7rem;
  background-color: var(--color-primary);
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  border-radius: 50%;
  outline: none;
  color: white;
  box-shadow: 0 0 20px var(--color-text-subtitle);
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-6px);
  }
`;

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  const lists = data.todo_lists;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const addTask = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: '123456789',
        task: {
          name: 'New Task',
          completed: false,
        },
      },
    });
  };

  const editTask = () => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        taskListId: '123456789',
        taskId: '343ERHFGIR4545',
        task: {
          name: 'Edited Spinach',
        },
      },
    });
  };

  const removeTask = () => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        taskListId: '123456789',
        taskId: '343ERHFGIR4545',
      },
    });
  };

  const toggleOpenMode = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, 1fr)' }}
    >
      {lists.map((list) => (
        <TodoList {...list} />
      ))}
      <StyledTodoListsButton onClick={toggleOpenMode}>
        <Text type="heading1" weight="300" color="white">
          +
        </Text>
      </StyledTodoListsButton>
      {isOpen && (
        <ModalBackground onClick={closeModal}>
          <TodoModal closeModal={closeModal} {...lists[0]} />
        </ModalBackground>
      )}
    </div>
  );
}

export default TodoPage;
