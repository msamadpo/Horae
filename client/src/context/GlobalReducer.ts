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
    case 'ADD_TASK_LIST':
      return addTaskList(state, action);
    case 'EDIT_TASK_LIST':
      return editTaskList(state, action);
    case 'DELETE_TASK_LIST':
      return deleteTaskList(state, action);
    default:
      return state;
  }
}
