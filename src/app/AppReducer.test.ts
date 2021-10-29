import {AppReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./AppReducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle'
    }
})

test('Correct error message should be set', () => {
    const endState = AppReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error')
})

test('Correct status should be set', () => {
    const endState = AppReducer(startState, setAppStatusAC('loading'))

    expect(endState.status).toBe('loading')
})