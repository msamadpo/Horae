import { GlobalState, Action } from 'context/GlobalReducer';
import { Task } from 'context/reducers/taskReducer';

export type NewTaskListPayload = {
  title: string;
  tasks: Task[];
  settings: {
    color: string;
  };
};

export type EditTaskListPayload = {
  title?: string;
  tasks?: Task[];
  settings?: {
    color: string;
  };
};

export const addTaskList = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_TASK_LIST') {
    return state;
  }
  const ID_HACK = Math.floor(Math.random() * 10000).toString(); // TODO Get the correct UUID from server
  const newTaskList = {
    id: ID_HACK,
    ...action.payload.taskList,
  };
  const newTaskLists = [...state.todo_lists, newTaskList];
  console.log('Dispatch ADD_TASK_LIST');
  return { ...state, todo_lists: newTaskLists };
};

export const editTaskList = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_TASK_LIST') {
    return state;
  }
  const newTaskList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
    ...action.payload.updates,
  };
  const newTaskLists = state.todo_lists.map((list) =>
    list.id === action.payload.taskListId ? newTaskList : list
  );
  console.log('Dispatch EDIT_TASK_LIST');
  return { ...state, todo_lists: newTaskLists };
};

export const deleteTaskList = (state: GlobalState, action: Action) => {
  if (action.type !== 'DELETE_TASK_LIST') {
    return state;
  }
  const newTaskLists = state.todo_lists.filter(
    (list) => list.id !== action.payload.taskListId
  );
  console.log('Dispatch DELETE_TASK_LIST');
  return { ...state, todo_lists: newTaskLists };
};
