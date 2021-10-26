import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, TodoListDomenType, TotoListReducer} from "./state/TodolistReducer";
import {addTaskAC, removeTaskAC, TasksReducer, TasksType} from "./state/TasksReducer";
import {tasksPriorities, taskStatuses} from "./api/todolists-api";


test('Todolist Reducer add Todolist', () => {

    let initState: TodoListDomenType[] = [{id: v1(), title: "What to learn", order: 0, addedDate: "", filter: "all"}]

    let newTodoList = TotoListReducer(initState, addTodoListAC({id: "test_todo_id", title: "testTodoTitle", order: 0, addedDate: ""}))

    expect(newTodoList.length).toBe(2)
    expect(newTodoList[0].title).toBe("testTodoTitle")
})

test('Todolist Reducer remove Todolist', () => {
    let tdID = v1()
    let initState: TodoListDomenType[] = [
        {id: v1(), title: "What to learn", order: 0, addedDate: "", filter: "all"},
        {id: tdID, title: "What to bye", order: 0, addedDate: "", filter: "all"}
    ]

    let newTodoList = TotoListReducer(initState, removeTodoListAC(tdID))

    expect(newTodoList.length).toBe(1)
    expect(newTodoList[0].title).toBe("What to learn")
})

test('Tasks Reducer add task', () => {
    let initState:TasksType = {
        ["todolistID"]: [
            {id: "testTaskID", title: "HTML&CSS", status: taskStatuses.Completed, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "JS", status: taskStatuses.Completed, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "ReactJS", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "Rest API", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "GraphQL", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId", order: 0, addedDate: "", description: "React task"},
        ]
    }


    let newTasks = TasksReducer(initState, addTaskAC(
    {id: "testId", title: "testTitle", status: taskStatuses.New, priority: tasksPriorities.Low,
        startDate: "", deadline: "", todoListId: "todolistID", order: 0, addedDate: "", description: "React task"}
    ))
    expect(newTasks["todolistID"].length).toBe(6)
    expect(newTasks["todolistID"][0].title).toBe('testTitle')
})

test('Tasks Reducer remove task', () => {
    let todolistID = v1()
    let testTaskID = v1()
    let initState = {
        [todolistID]: [
            {id: testTaskID, title: "HTML&CSS", status: taskStatuses.Completed, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "JS", status: taskStatuses.Completed, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "ReactJS", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "Rest API", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: "", description: "React task"},
            {id: v1(), title: "GraphQL", status: taskStatuses.New, priority: tasksPriorities.Low,
                startDate: "", deadline: "", todoListId: "todolistId1", order: 0, addedDate: "", description: "React task"},
        ]
    }


    let newTasks = TasksReducer(initState, removeTaskAC(todolistID, testTaskID))
     expect(newTasks[todolistID].length).toBe(4)
     expect(newTasks[todolistID][0].title).toBe("JS")
})