import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {log} from "util";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '9660a6e9-744c-4376-8717-32b82016bc28'
    }
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
