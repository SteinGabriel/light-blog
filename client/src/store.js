import { createStore, combineReducers } from 'redux'
import { home } from './reducers'

// Create a combinations of all reducers
// into reducers folder
const reducers = combineReducers({
  home
})

// Create stores
const store = createStore(reducers)

export default store
