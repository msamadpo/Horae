import mockData from 'assets/data/mockUserData.json';
import {
  NewTaskPayload,
  EditTaskPayload,
  addTask,
  removeTask,
  editTask,
} from 'context/reducers/taskReducers';

export type GlobalState = typeof mockData;
export type Action =
  | { type: 'ADD_TASK'; payload: { taskListId: string; task: NewTaskPayload } }
  | { type: 'REMOVE_TASK'; payload: { taskListId: string; taskId: string } }
  | {
      type: 'EDIT_TASK';
      payload: { taskListId: string; taskId: string; task: EditTaskPayload };
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
