import {authAPI} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setIsLoggedInAC} from "../features/Login/AuthReducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type InitialStateType = {
    isInitialized: boolean
    status: RequestStatusType,
    error: string | null
}

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

export const AppReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_IS_INITIALIZED":
            return {...state, isInitialized: action.value}
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default: return {...state}
    }
}

// action creators
export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET_IS_INITIALIZED', value} as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)

// thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(res, dispatch)
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedType = ReturnType<typeof setIsInitializedAC>
export type AppActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsInitializedType

