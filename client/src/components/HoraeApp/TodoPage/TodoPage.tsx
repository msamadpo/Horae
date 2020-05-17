import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  const tasks = data.todo_lists[0].tasks;

  const removeTask = () => {
    dispatch({
      type: 'REMOVE_TASK',
      payload: {
        taskListId: '123456789',
        taskId: '343ERHFGIR4545',
      },
    });
  };
  return (
    <div onClick={removeTask}>
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
