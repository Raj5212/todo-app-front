import { combineReducers } from 'redux';
import authReducer from './Auth/auth-reducer';
import todoReducer from './Todo/todo-reducer'; 

export default combineReducers({
  auth: authReducer,
  todos: todoReducer,
});
