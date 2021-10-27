export type InitialStateType = {
    status: RequestStatusType,
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default: return {...state}
    }
}

export const setStatusAC = (status:  RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType =
    ReturnType<typeof setErrorAC>
    | ReturnType<typeof setStatusAC>