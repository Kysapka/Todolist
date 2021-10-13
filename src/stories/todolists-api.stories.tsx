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
    const [title, seTitle] = useState<string>('')

    const createTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={title} onChange={e => seTitle(e.currentTarget.value)} placeholder={'todolistId'}/>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const updateTodolist = () => {
        todolistsAPI.updateTodolist(title, todolistId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}/>
            <input value={title} onChange={e => setTitle(e.currentTarget.value)} placeholder={'new title'}/>
            <button onClick={updateTodolist}>Update todolist</button>
        </div>
    </div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTodolist = (todolistId: string) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}/>
            <button onClick={() => deleteTodolist(todolistId)}>Delete Todolist</button>
        </div>
    </div>
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
    const [taskId, seTtaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        console.log(taskId)
        console.log(todolistId)
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)} placeholder={'todolistId'}/>
            <input value={taskId} onChange={e => seTtaskId(e.currentTarget.value)} placeholder={'taskId'}/>
        <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}

