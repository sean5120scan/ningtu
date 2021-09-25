const saveUserInfo = (data) => {
    return {
        type: "SAVE_USERINFO",
        payload: data
    }
}

export {
    saveUserInfo
}