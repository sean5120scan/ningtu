let user = {
    loading: false,
    userInfo: {}
}

const userReducer = (state = user, action) => {

    switch (action.type) {
        case "SAVE_USERINFO":

            return {
                ...state,
                userInfo: action.payload
            }
            default:
                return state;
    }
}
export default userReducer