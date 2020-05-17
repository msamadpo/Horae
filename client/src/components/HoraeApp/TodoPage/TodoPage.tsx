import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';
import TodoList from 'components/HoraeApp/TodoPage/TodoList';
import TodoInput from 'components/HoraeApp/TodoPage/TodoInput';


function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  console.log(data.todo_lists[0].tasks);
  return <div> <TodoList /> <TodoInput/> </div>;
}

export default TodoPage;
