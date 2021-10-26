export const TDL_ACTIONS = {
    ADD_TODOLIST: 'ADD-TODOLIST',
    REMOVE_TODOLIST: 'REMOVE_TODOLIST',
    CHANGE_TDL_NAME: 'CHANGE_TDL_NAME',
    CHANGE_FILTER: 'CHANGE_FILTER',
    SET_TODOLISTS: 'SET_TODOLISTS',
} as const

export const TSK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    REMOVE_TASK: 'REMOVE_TASK',
    ADD_EMPTY_TASK_LIST: 'ADD_EMPTY_TASK_LIST',
    REMOVE_EMPTY_TASK_LIST: 'REMOVE_EMPTY_TASK_LIST',
    CHANGE_TASK_NAME: 'CHANGE_TASK_NAME',
    CHANGE_TASK_STATUS: 'CHANGE_TASK_STATUS',
    SET_TASKS: 'SET_TASKS',
    UPDATE_TASK: 'UPDATE_TASK'
} as const