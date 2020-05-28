import mockData from 'assets/data/mockUserData.json';
import {
  NewTaskPayload,
  EditTaskPayload,
  addTask,
  removeTask,
  editTask,
} from 'context/reducers/taskReducer';
import {
  NewTaskListPayload,
  EditTaskListPayload,
  addTaskList,
  editTaskList,
  deleteTaskList,
} from 'context/reducers/taskListReducer';
import {
  NewCalendarPayload,
  EditCalendarPayload,
  addCalendar,
  editCalendar,
  deleteCalendar,
} from 'context/reducers/calendarReducer';
import {
  NewCalendarEventPayload,
  EditCalendarEventPayload,
  addCalendarEvent,
  editCalendarEvent,
  deleteCalendarEvent,
} from 'context/reducers/calendarEventReducer';

export type GlobalState = typeof mockData;
export type Action =
  | { type: 'ADD_TASK'; payload: { taskListId: string; task: NewTaskPayload } }
  | { type: 'REMOVE_TASK'; payload: { taskListId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: { taskListId: string; taskId: string; task: EditTaskPayload };
    }
  | { type: 'ADD_TASK_LIST'; payload: { taskList: NewTaskListPayload } }
  | {
      type: 'EDIT_TASK_LIST';
      payload: { taskListId: string; updates: EditTaskListPayload };
    }
  | {
      type: 'DELETE_TASK_LIST';
      payload: { taskListId: string };
    }
  | {
      type: 'ADD_CALENDAR';
      payload: { calendar: NewCalendarPayload };
    }
  | {
      type: 'EDIT_CALENDAR';
      payload: { calendarId: string; updates: EditCalendarPayload };
    }
  | {
      type: 'DELETE_CALENDAR';
      payload: { calendarId: string };
    }
  | {
      type: 'ADD_CALENDAR_EVENT';
      payload: { calendarId: string; event: NewCalendarEventPayload };
    }
  | {
      type: 'DELETE_CALENDAR_EVENT';
      payload: { calendarId: string; eventId: string };
    }
  | {
      type: 'EDIT_CALENDAR_EVENT';
      payload: {
        calendarId: string;
        eventId: string;
        task: EditCalendarEventPayload;
      };
    };

export default function globalReducer(
  state: GlobalState,
  action: Action
): GlobalState {
  switch (action.type) {
    case 'ADD_TASK': {
      const newState = addTask(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'REMOVE_TASK': {
      const newState = removeTask(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'EDIT_TASK': {
      const newState = editTask(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'ADD_TASK_LIST': {
      const newState = addTaskList(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'EDIT_TASK_LIST': {
      const newState = editTaskList(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'DELETE_TASK_LIST': {
      const newState = deleteTaskList(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'ADD_CALENDAR': {
      const newState = addCalendar(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'EDIT_CALENDAR': {
      const newState = editCalendar(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'DELETE_CALENDAR': {
      const newState = deleteCalendar(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'ADD_CALENDAR_EVENT': {
      const newState = addCalendarEvent(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'EDIT_CALENDAR_EVENT': {
      const newState = editCalendarEvent(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    case 'DELETE_CALENDAR_EVENT': {
      const newState = deleteCalendarEvent(state, action);
      localStorage.setItem('horaeData', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}
