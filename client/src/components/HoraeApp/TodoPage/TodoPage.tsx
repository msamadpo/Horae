import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  console.log(data.todo_lists[0].tasks);
  return <div>Todo Page</div>;
}

export default TodoPage;
