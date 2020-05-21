import mockData from 'assets/data/mockUserData.json';

export type Task = {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
};

export type NewTaskPayload = {
  name: string;
  deadline?: string;
  completed: boolean;
};

export type EditTaskPayload = {
  name?: string;
  deadline?: string;
  completed?: boolean;
};

export type CalendarEvent = {
  id: string;
  name: string;
  description?: string;
  date: string;
  duration: number;
  location: string;
};

export type GlobalState = typeof mockData;

export type Action =
  | { type: 'ADD_TASK'; payload: { taskListId: string; task: NewTaskPayload } }
  | { type: 'REMOVE_TASK'; payload: { taskListId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: { taskListId: string; taskId: string; task: EditTaskPayload };
    }
  | {
      type:
        | 'ADD_CALENDAR_EVENT'
        | 'REMOVE_CALENDAR_EVENT'
        | 'EDIT_CALENDAR_EVENT';
      payload: CalendarEvent;
    };

export default function globalReducer(
  state: GlobalState,
  action: Action
): GlobalState {
  switch (action.type) {
    case 'ADD_TASK':
      return addTask(state, action);
    case 'REMOVE_TASK':
      return removeTask(state, action);
    case 'EDIT_TASK':
      return editTask(state, action);
    default:
      return state;
  }
}

const addTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_TASK') {
    return state;
  }
  const ID_HACK = Math.floor(Math.random() * 10000).toString(); // TODO Get the correct UUID from server
  const newTask = {
    id: ID_HACK,
    deadline: '',
    ...action.payload.task,
  };
  const newTaskList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  newTaskList.tasks.push(newTask);
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch ADD_TASK');
  return { ...state, todo_lists: newTaskLists };
};

const removeTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'REMOVE_TASK') {
    return state;
  }
  const currentList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  const newTaskList = {
    ...currentList,
    tasks: currentList.tasks.filter(
      (task) => task.id !== action.payload.taskId
    ),
  };
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch REMOVE_TASK');
  return { ...state, todo_lists: newTaskLists };
};

const editTask = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_TASK') {
    return state;
  }
  const currentList = {
    ...state.todo_lists.filter(
      (list) => list.id === action.payload.taskListId
    )[0],
  };
  const newTaskList = {
    ...currentList,
    tasks: currentList.tasks.map((task) =>
      task.id === action.payload.taskId
        ? { ...task, ...action.payload.task }
        : task
    ),
  };
  const newTaskLists = state.todo_lists.map((todoList) =>
    todoList.id === action.payload.taskListId ? newTaskList : todoList
  );
  console.log('Dispatch REMOVE_TASK');
  return { ...state, todo_lists: newTaskLists };
};
