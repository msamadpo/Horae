type CalendarData = {};
type TaskData = {};

export type State = {
  userData: {};
};

export type Action = {
  type:
    | 'ADD_TASK'
    | 'EDIT_TASK'
    | 'REMOVE_TASK'
    | 'ADD_CALENDAR_EVENT'
    | 'REMOVE_CALENDAR_EVENT'
    | 'EDIT_CALENDAR_EVENT';
  payload: TaskData | CalendarData;
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'ADD_TASK':
      return state;
    case 'EDIT_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    case 'ADD_CALENDAR_EVENT':
      return state;
    case 'REMOVE_CALENDAR_EVENT':
      return state;
    case 'EDIT_CALENDAR_EVENT':
      return state;
    default:
      return state;
  }
}
