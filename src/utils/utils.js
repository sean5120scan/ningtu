const getToken = () => {
    return localStorage.getItem("token")
}
const hasToken = () => {
    return localStorage.getItem("token") ? true : false
}
const clearToken = () => {
    localStorage.removeItem("token")
}

const saveToken = (token) => {
    localStorage.setItem("token", token)
}

const ls = {
    get(name) {
        try {
            return JSON.parse(localStorage.getItem(name))
        } catch (err) {
            return localStorage.getItem(name)
        }
    },
    set(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    },
    clear() {
        localStorage.clear()
    },
    remove(item) {
        localStorage.removeItem(item)
    }

}

export {
    getToken,
    clearToken,
    saveToken,
    hasToken,
    ls
}