import mockData from 'assets/data/mockUserData.json';

export type Task = {
  id: string;
  name: string;
  deadline?: string;
  completed: boolean;
};

export type TaskPayload = {
  name: string;
  deadline?: string;
  completed: boolean;
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
  | { type: 'ADD_TASK'; payload: { taskListId: string; task: TaskPayload } }
  | { type: 'REMOVE_TASK'; payload: { taskListId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: { taskListId: string; taskId: string; task: TaskPayload };
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
    case 'ADD_TASK': {
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
    }
    case 'REMOVE_TASK': {
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
    }
    case 'EDIT_TASK':
      console.log('Dispatch EDIT_TASK');
      return state;
    default:
      return state;
  }
}
