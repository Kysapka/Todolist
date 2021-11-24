import {
  AppReducer,
  InitialStateType,
  setAppErrorAC,
  setAppStatusAC,
} from './AppReducer';

let startState: InitialStateType;

beforeEach(() => {
  startState = {
    error: null,
    status: 'idle',
    isInitialized: false,
  };
});

test('Correct error message should be set', () => {
  const endState = AppReducer(startState, setAppErrorAC({ error: 'some error' }));

  expect(endState.error).toBe('some error');
});

test('Correct status should be set', () => {
  const endState = AppReducer(startState, setAppStatusAC({ status: 'loading' }));

  expect(endState.status).toBe('loading');
});
