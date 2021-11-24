import axios, { AxiosResponse } from 'axios';

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '9660a6e9-744c-4376-8717-32b82016bc28',
  },
};
const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  ...settings,
});

export const todolistsAPI = {
  getTodolist() {
    return instance.get<Array<TodolistType>>('todo-lists', settings);
  },
  createTodolist(title: string) {
    return instance.post<{ title: string }, ResponseType<{ item: TodolistType }>>(
      'todo-lists',
      { title },
    );
  },
  updateTodolist(title: string, id: string) {
    return instance.put<{ title: string }, ResponseType>(`todo-lists/${id}`, { title });
  },
  deleteTodolist(todolistID: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}`);
  },

  getTasks(todolistID: string) {
    return instance.get<{ todolistID: string }, AxiosResponse<GetTasksResponse>>(
      `todo-lists/${todolistID}/tasks`,
    );
  },
  createTask(title: string, todolistId: string) {
    return instance.post<{ title: string }, ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  updateTask(todolistId: string, taskId: string, model: PayloadTaskType) {
    return instance.put<PayloadTaskType, ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<{ todolistId: string; taskId: string }, ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
};

export const authAPI = {
  login(authPayload: AuthPayloadType) {
    return instance.post<AuthPayloadType, ResponseType<{ userId: number }>>(
      '/auth/login',
      authPayload,
    );
  },
  logout() {
    return instance.delete<null, ResponseType>('/auth/login');
  },
  me() {
    return instance.get<null, ResponseType<AuthResponseType>>('/auth/me');
  },
};

// types
export enum taskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum tasksPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type TodolistType = {
  id: string;
  title: string;
  order: number;
  addedDate: string;
};

export type TaskType = {
  description: string;
  title: string;
  status: taskStatuses;
  priority: tasksPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type ResponseType<D = {}> = {
  data: {
    resultCode: number;
    messages: string[];
    data: D;
  };
};
type GetTasksResponse = {
  items: Array<TaskType>;
  totalCount: number;
  error: string | null;
};
export type PayloadTaskType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type AuthPayloadType = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
};

type AuthResponseType = {
  id: number;
  email: string;
  login: string;
};
