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
  console.log({ ...state, todo_lists: newTaskLists });
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

// export const removeTask = (state: GlobalState, action: Action) => {
//   if (action.type !== 'REMOVE_TASK') {
//     return state;
//   }
//   const currentList = {
//     ...state.todo_lists.filter(
//       (list) => list.id === action.payload.taskListId
//     )[0],
//   };
//   const newTaskList = {
//     ...currentList,
//     tasks: currentList.tasks.filter(
//       (task) => task.id !== action.payload.taskId
//     ),
//   };
//   const newTaskLists = state.todo_lists.map((todoList) =>
//     todoList.id === action.payload.taskListId ? newTaskList : todoList
//   );
//   console.log('Dispatch REMOVE_TASK');
//   return { ...state, todo_lists: newTaskLists };
// };

// export const editTask = (state: GlobalState, action: Action) => {
//   if (action.type !== 'EDIT_TASK') {
//     return state;
//   }
//   const currentList = {
//     ...state.todo_lists.filter(
//       (list) => list.id === action.payload.taskListId
//     )[0],
//   };
//   const newTaskList = {
//     ...currentList,
//     tasks: currentList.tasks.map((task) =>
//       task.id === action.payload.taskId
//         ? { ...task, ...action.payload.task }
//         : task
//     ),
//   };
//   const newTaskLists = state.todo_lists.map((todoList) =>
//     todoList.id === action.payload.taskListId ? newTaskList : todoList
//   );
//   console.log('Dispatch REMOVE_TASK');
//   return { ...state, todo_lists: newTaskLists };
// };
