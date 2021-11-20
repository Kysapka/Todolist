import { v1 } from 'uuid';

import {
  addTodoListAC,
  changeTodolistEntityStatusAC,
  removeTodoListAC,
  TodoListDomenType,
  TotoListReducer,
} from './TodolistReducer';

test('Todolist Reducer add Todolist', () => {
  const initState: TodoListDomenType[] = [
    {
      id: v1(),
      title: 'What to learn',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'idle',
    },
  ];

  const newTodoList = TotoListReducer(
    initState,
    addTodoListAC({
      id: 'test_todo_id',
      title: 'testTodoTitle',
      order: 0,
      addedDate: '',
    }),
  );

  expect(newTodoList.length).toBe(2);
  expect(newTodoList[0].title).toBe('testTodoTitle');
});
test('Todolist Reducer remove Todolist', () => {
  const tdID = v1();
  const initState: TodoListDomenType[] = [
    {
      id: v1(),
      title: 'What to learn',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'idle',
    },
    {
      id: tdID,
      title: 'What to bye',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'idle',
    },
  ];

  const newTodoList = TotoListReducer(initState, removeTodoListAC(tdID));

  expect(newTodoList.length).toBe(1);
  expect(newTodoList[0].title).toBe('What to learn');
});

test('Todolist tlEmptytyStatus  must be chenged correctly', () => {
  const initState: TodoListDomenType[] = [
    {
      id: 'test_todo_id',
      title: 'What to learn',
      order: 0,
      addedDate: '',
      filter: 'all',
      tlEntityStatus: 'idle',
    },
  ];

  const newTodoList = TotoListReducer(
    initState,
    changeTodolistEntityStatusAC('test_todo_id', 'loading'),
  );

  expect(newTodoList[0].tlEntityStatus).toBe('loading');
});
