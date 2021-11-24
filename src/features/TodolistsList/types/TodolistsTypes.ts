// types
import { TodolistType } from '../../../api/todolists-api';
import { RequestStatusType } from '../../../app/AppReducer';

export type TodoListsType = Array<TodoListDomenType>;

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomenType = TodolistType & {
  filter: FilterValuesType;
  tlEntityStatus: RequestStatusType;
};
