import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, TodoListDomenType, TotoListReducer} from "../TodolistReducer";


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