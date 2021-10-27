import {AppReducer, InitialStateType, setErrorAC, setStatusAC} from "./AppReducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('Correct error message should be set', () => {
    const endState = AppReducer(startState, setErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('Correct status should be set', () => {
    const endState = AppReducer(startState, setStatusAC('loading'))

    expect(endState.status).toBe('loading')
})