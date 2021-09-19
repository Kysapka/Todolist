export type storageStateType = ReturnType<typeof loadState>

export const loadState = () => {
    try {
        let initState = localStorage.getItem('app-state')
        if (initState) {
            return JSON.parse(initState)
        }
    }
    catch (err) {}
}