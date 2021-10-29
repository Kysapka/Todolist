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
            console.log('app reducer state chanded status: ' + action.status)
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default: return {...state}
    }
}

export const setAppStatusAC = (status:  RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type AppActionsType = SetAppErrorActionType | SetAppStatusActionType

