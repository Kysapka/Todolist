import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, todoListsType, TotoListReducer} from "./TodolistReducer";
import {addTaskAC, removeTaskAC, TasksReducer} from "./TasksReducer";


test('Todolist Reducer add Todolist', () => {
    let initState: todoListsType = [{id: v1(), title: "What to learn", filter: "all"}]

    let newTodoList = TotoListReducer(initState, addTodoListAC('testTodo', 'testID'))

    expect(newTodoList.length).toBe(2)
    expect(newTodoList[0].title).toBe("testTodo")
})

test('Todolist Reducer remove Todolist', () => {
    let tdID = v1()
    let initState: todoListsType = [
        {id: v1(), title: "What to learn", filter: "all"},
        {id: tdID, title: "What to bye", filter: "all"}
    ]

    let newTodoList = TotoListReducer(initState, removeTodoListAC(tdID))

    expect(newTodoList.length).toBe(1)
    expect(newTodoList[0].title).toBe("What to learn")
})

test('Tasks Reducer add task', () => {
    let todolistID = v1()
    let testTaskID = v1()
    let initState = {
        [todolistID]: [
            {id: testTaskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    }


    let newTasks = TasksReducer(initState, addTaskAC(todolistID, 'testTitle'))
    expect(newTasks[todolistID].length).toBe(6)
    expect(newTasks[todolistID][5].title).toBe('testTitle')
})

test('Tasks Reducer remove task', () => {
    let todolistID = v1()
    let testTaskID = v1()
    let initState = {
        [todolistID]: [
            {id: testTaskID, title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    }


    let newTasks = TasksReducer(initState, removeTaskAC(todolistID, testTaskID))
     expect(newTasks[todolistID].length).toBe(4)
     expect(newTasks[todolistID][0].title).toBe("JS")
})