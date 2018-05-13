import { combineReducers } from "redux"

import lines from "./logReducer"
import regex from "./regexReducer"

export default combineReducers({
    lines, regex
})