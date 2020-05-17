import React, { useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  console.log(data.todo_lists[0].tasks);
  const [count, setCount] = useState<number>(1);
  const tasks = data.todo_lists[0].tasks;

  const addTodo = () => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        taskListId: '123456789', // Hardcoded ID for the current task list in mock database
        task: {
          name: `New Todo`,
          completed: false,
        },
      },
    });
  };

  return (
    <div onClick={addTodo}>
      Todo Page
      <div>
        {tasks.map((task) => (
          <div>{task.name}</div>
        ))}
      </div>
    </div>
  );
}

export default TodoPage;
