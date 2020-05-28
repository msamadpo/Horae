import { GlobalState, Action } from 'context/GlobalReducer';
import { CalendarEvent } from 'context/reducers/calendarReducer';

export type NewCalendarEventPayload = Partial<Omit<CalendarEvent, 'id'>>;
export type EditCalendarEventPayload = Partial<NewCalendarEventPayload>;

export const addCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'ADD_CALENDAR_EVENT') {
    return state;
  }
  const ID_HACK = Math.floor(Math.random() * 10000).toString(); // TODO Get the correct UUID from server
  const newCalendarEvent = {
    id: ID_HACK,
    location: '',
    description: '',
    date: '',
    name: '',
    duration: 1,
    ...action.payload.event,
  };
  const oldCalendar = state.calendars.filter(
    (calendar) => calendar.id === action.payload.calendarId
  )[0];
  const newCalendar = {
    ...oldCalendar,
    events: [...oldCalendar.events, newCalendarEvent],
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch ADD_CALENDAR_EVENT');
  return { ...state, calendars: newCalendars };
};

export const editCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'EDIT_CALENDAR_EVENT') {
    return state;
  }
  const currentCalendar = {
    ...state.calendars.filter(
      (calendar) => calendar.id === action.payload.calendarId
    )[0],
  };
  const newCalendar = {
    ...currentCalendar,
    events: currentCalendar.events.map((event) =>
      event.id === action.payload.eventId
        ? { ...event, ...action.payload.event }
        : event
    ),
  };
  const newCalendars = state.calendars.map((calendar) =>
    calendar.id === action.payload.calendarId ? newCalendar : calendar
  );
  console.log('Dispatch EDIT_CALENDAR_EVENT');
  return { ...state, calendars: newCalendars };
};

export const deleteCalendarEvent = (state: GlobalState, action: Action) => {
  if (action.type !== 'DELETE_TASK_LIST') {
    return state;
  }
  const newTaskLists = state.todo_lists.filter(
    (list) => list.id !== action.payload.taskListId
  );
  console.log('Dispatch DELETE_TASK_LIST');
  return { ...state, todo_lists: newTaskLists };
};
