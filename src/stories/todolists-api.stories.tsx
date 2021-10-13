import React, {useEffect, useState} from 'react'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        // const getUsers =  async () => {
        //     setState(await todolistsAPI.getTodolist())
        // }
        // getUsers()

        todolistsAPI.getTodolist()
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.createTodolist('Artem todolist')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'Yo yo'
        const todolistId = '7e75341e-47e5-4ecf-982f-a558a9767694'
        todolistsAPI.updateTodolist(newTitle, todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7e75341e-47e5-4ecf-982f-a558a9767694'
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        // const getUsers =  async () => {
        //     setState(await todolistsAPI.getTodolist())
        // }
        // getUsers()
        const todolistId = '42818c70-de08-449a-988a-5e9ea8f7dd2f'
        todolistsAPI.getTasks(todolistId)
            .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = 'Artemy test task 2'
        const todolistId = '42818c70-de08-449a-988a-5e9ea8f7dd2f'
        todolistsAPI.createTask(newTitle, todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const body = {
            description: ':null',
            complited: 'new complited',
            title: 'new title2',
            status: 0,
            priority: 1,
            startDate: '2021-10-13T06:50:27.857',
            deadline: '2021-10-13T06:50:27.857'
        }
        const todolistId = '42818c70-de08-449a-988a-5e9ea8f7dd2f'
        const taskId = '4fbf271b-fdab-4aeb-84f3-7a193637b179'

        todolistsAPI.updateTask(todolistId, taskId, body)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    const deleteTask = () => {
        const todolistId = '42818c70-de08-449a-988a-5e9ea8f7dd2f'
        const taskId = '59a9ca6b-e149-44c9-8f07-9015b066dac9'
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
        <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

