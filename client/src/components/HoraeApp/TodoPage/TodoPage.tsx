import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import TodoList from 'components/HoraeApp/TodoPage/TodoList';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput';

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  const listData = data.todo_lists;
  return (
    <div>
      {listData.map((item) => (
        <TodoList {...item} />
      ))}
    </div>
  );
}

export default TodoPage;
