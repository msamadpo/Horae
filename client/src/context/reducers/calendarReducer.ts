import { GlobalState, Action } from 'context/GlobalReducer';

export type CalendarEvent = {
  id: string;
  name: string;
  description: string;
  date: string;
  duration: number;
  location: string;
};

export type Calendar = {
  id: string;
  title: string;
  settings: {
    color: string;
  };
  events: CalendarEvent[];
};

export type NewCalendarPayload = {
  title: string;
  settings?: {
    color: string;
  };
  events: CalendarEvent[];
};

export type EditCalendarPayload = {
  title?: string;
  settings?: {
    color: string;
  };
  events?: CalendarEvent[];
};

export const addCalendar = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_CALENDAR') {
    return state;
  }
  const ID_HACK = Math.floor(Math.random() * 10000).toString(); // TODO Get the correct UUID from server
  const newCalendar = {
    id: ID_HACK,
    settings: { color: '--color-primary' },
    events: [],
    ...action.payload.calendar,
  };
  const newCalendars = [...state.calendars, newCalendar];
  console.log('Dispatch ADD_CALENDAR');
  console.log({ ...state, calendars: newCalendars });
  return { ...state, calendars: newCalendars };
};

export const editCalendar = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_CALENDAR') {
    return state;
  }
  const newCalendar = {
    ...state.calendars.filter(
      (calendar) => calendar.id === action.payload.calendarId
    )[0],
    ...action.payload.updates,
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch EDIT_TASK_LIST');
  return { ...state, calendars: newCalendars };
};

// export const editTaskList = (state: GlobalState, action: Action) => {
//   if (action.type !== 'EDIT_TASK_LIST') {
//     return state;
//   }
// const newTaskList = {
//   ...state.todo_lists.filter(
//     (list) => list.id === action.payload.taskListId
//   )[0],
//   ...action.payload.updates,
// };
// const newTaskLists = state.todo_lists.map((list) =>
//   list.id === action.payload.taskListId ? newTaskList : list
// );
// console.log('Dispatch EDIT_TASK_LIST');
// return { ...state, todo_lists: newTaskLists };
// };

// export const deleteTaskList = (state: GlobalState, action: Action) => {
//   if (action.type !== 'DELETE_TASK_LIST') {
//     return state;
//   }
//   const newTaskLists = state.todo_lists.filter(
//     (list) => list.id !== action.payload.taskListId
//   );
//   console.log('Dispatch DELETE_TASK_LIST');
//   return { ...state, todo_lists: newTaskLists };
// };
