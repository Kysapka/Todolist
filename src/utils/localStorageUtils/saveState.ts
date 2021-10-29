import {storageStateType} from "./loadState";

export const saveState = (state: storageStateType) => {
    localStorage.setItem('app-state', JSON.stringify(state))
}