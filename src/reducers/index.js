import app from "./app"
import user from "./user"
import {
    combineReducers
} from "redux"
const reducers = combineReducers({
    app,
    user
})

export default reducers