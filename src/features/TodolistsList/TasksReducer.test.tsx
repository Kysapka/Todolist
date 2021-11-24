export {};
// import { v1 } from 'uuid';
//
// import { tasksPriorities, taskStatuses } from '../../api/todolists-api';
//
// import { addTaskAC, removeTaskAC, TasksReducer, TasksType } from './TasksReducer';
//
// test('Tasks Reducer add task', () => {
//   const initState: TasksType = {
//     todolistID: [
//       {
//         id: 'testTaskID',
//         title: 'HTML&CSS',
//         status: taskStatuses.Completed,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'JS',
//         status: taskStatuses.Completed,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'ReactJS',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'Rest API',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'GraphQL',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//     ],
//   };
//
//   const newTasks = TasksReducer(
//     initState,
//     addTaskAC({
//       id: 'testId',
//       title: 'testTitle',
//       status: taskStatuses.New,
//       priority: tasksPriorities.Low,
//       startDate: '',
//       deadline: '',
//       todoListId: 'todolistID',
//       order: 0,
//       addedDate: '',
//       description: 'React task',
//     }),
//   );
//   expect(newTasks.todolistID.length).toBe(6);
//   expect(newTasks.todolistID[0].title).toBe('testTitle');
// });
// test('Tasks Reducer remove task', () => {
//   const todolistID = v1();
//   const testTaskID = v1();
//   const initState: TasksType = {
//     [todolistID]: [
//       {
//         id: testTaskID,
//         title: 'HTML&CSS',
//         status: taskStatuses.Completed,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId1',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'JS',
//         status: taskStatuses.Completed,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId1',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'ReactJS',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId1',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'Rest API',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId1',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//       {
//         id: v1(),
//         title: 'GraphQL',
//         status: taskStatuses.New,
//         priority: tasksPriorities.Low,
//         startDate: '',
//         deadline: '',
//         todoListId: 'todolistId1',
//         order: 0,
//         addedDate: '',
//         description: 'React task',
//         tsEntityStatus: 'idle',
//       },
//     ],
//   };
//
//   const newTasks = TasksReducer(initState, removeTaskAC(todolistID, testTaskID));
//   expect(newTasks[todolistID].length).toBe(4);
//   expect(newTasks[todolistID][0].title).toBe('JS');
// });
