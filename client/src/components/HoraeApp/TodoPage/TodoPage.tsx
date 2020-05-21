import React, { useContext } from 'react';
import GlobalContext from 'context/GlobalContext';

function TodoPage() {
  const { data, dispatch } = useContext(GlobalContext);
  const tasks = data.todo_lists[0].tasks;

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

  return (
    <div>
      Todo Page
      <div>
        {tasks.map((task) => (
          <div>{task.name}</div>
        ))}
      </div>
      <div>
        <button onClick={addTask}>Add task</button>
        <button onClick={removeTask}>Remove task</button>
        <button onClick={editTask}>Edit task</button>
      </div>
    </div>
  );
}

export default TodoPage;
