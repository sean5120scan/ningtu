let appState = {
    sideBar: true
}
const appReducer = (state = appState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                sideBar: action.sideBar
            }
            default:
                return state
    }
}
export default appReducer