import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { authReducer } from './authReducer';
import { projectItemReducer } from './projectItemReducer';
import { projectsReducer } from './projectsReducer';
import { userItemReducer } from './userItemReducer';
import { usersReducer } from './usersReducer';

let reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  userItem: userItemReducer,
  projects: projectsReducer,
  projectItem: projectItemReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
