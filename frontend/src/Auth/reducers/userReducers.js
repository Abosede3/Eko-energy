import { combineReducers } from "redux";

// setting up session

import { sessionReducer } from "redux-react-session";

const userReducers = combineReducers({
 session: sessionReducer
})

export default userReducers;