import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import TodoList from 'components/HoraeApp/TodoPage/TodoList/TodoList';
import styled from 'styled-components';

const TodoPageBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

function TodoPage() {
  const { data } = useContext(GlobalContext);
  const taskLists = data.todo_lists;
  return (
    <TodoPageBody>
      {taskLists.map((taskList) => (
        <TodoList key={taskList.id} {...taskList} />
      ))}
    </TodoPageBody>
  );
}

export default TodoPage;
