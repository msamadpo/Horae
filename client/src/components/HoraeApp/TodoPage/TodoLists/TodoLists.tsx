import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Task, EditTaskPayload } from 'context/reducers/taskReducer';

import Text from 'components/Common/Text';
import TodoListsItem from 'components/HoraeApp/TodoPage/TodoListsItem/TodoListsItem';
import TodoListsInput from 'components/HoraeApp/TodoPage/TodoListsInput/TodoListsInput';
import styled from 'styled-components';

interface ITodoListsProps {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  tasks: Task[];
}

const StyledTodoList = styled.div`
  display: flex;
  min-width: 20rem;
  max-width: 20rem;
  min-height:  15rem;
  max-height: 15rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const StyledTodoListBox = styled.div`
  background-color: #444;
  padding: var(--spacing-tiny);
  text-align: center;
`;

function TodoLists({ title, tasks }: ITodoListsProps) {
  const { dispatch } = useContext(GlobalContext);

  const addTaskList = (listTitle: string) => {
    dispatch({
        type: 'ADD_TASK_LIST',
        payload: {
          taskList: {
            title: listTitle,
            tasks: [],
            settings: {
              color: 'navy blue',
            },
          },
        },
      });
    }

  return (
    <StyledTodoList>
      <StyledTodoListBox>
        <Text type="small" color="white" weight="300">
          <TodoListsInput createNewTodoList={addTaskList} />
        </Text>
      </StyledTodoListBox>
    </StyledTodoList>
  );
}

export default TodoLists;
