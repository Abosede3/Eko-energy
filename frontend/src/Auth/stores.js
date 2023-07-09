import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk' // Fix the import statement
import userReducers from './reducers/userReducers'
import { sessionService } from 'redux-react-session'

const initialState = {}
const middlewares = [thunk]

const store = createStore(
  userReducers,
  initialState,
  compose(applyMiddleware(...middlewares))
)

sessionService.initSessionService(store)

export default store
