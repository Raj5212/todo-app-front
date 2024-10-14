import * as constants from '../constant';
import * as apis from '../api';
// import * as payloads from 'redux/auth/payloads';
// import * as services from '../service/index';
// import * as messages from 'redux/toast/messages';
import {  GET, POST, PUT, DELETE } from '../constant';
import API_REQUEST from '../request/index';

// Fetch all To-Do items
export const fetchTodos = () => async (dispatch) => {
  try {
    dispatch({ type: constants.TODO_LIST_REQUEST });
    const res = await API_REQUEST(GET, apis.GET_TODO);
    console.log(res) 
    dispatch({
      type: constants.TODO_LIST_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.error('fetchTodos...', err);
    dispatch({ type: constants.TODO_LIST_FAIL });
  }
};

// Add a new To-Do item
export const addTodo = (data) => async (dispatch) => {
  try {
    dispatch({ type: constants.CREATE_TODO });
    const res = await API_REQUEST(POST, apis.ADD_TODO, data); 

    console.log(res)
    dispatch({
      type: constants.TODO_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.error('addTodo...', err);
    dispatch({ type: constants.TODO_FAIL });
  }
};

// Update a To-Do item
export const updateTodo = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: constants.UPDATE_TODO_REQUEST });
    const res = await API_REQUEST(PUT, `${apis.UPDATE_TODO}/${id}`, data); 
    dispatch({
      type: constants.UPDATE_REQUEST_SUCCESS,
      payload: res?.data?.data,
    });
  } catch (err) {
    console.error('updateTodo...', err);
    dispatch({ type: constants.UPDATE_REQUEST_FAIL });
  }
};

// Delete a To-Do item
export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.DELETE_TODO_REQUEST });
    await API_REQUEST(DELETE, `${apis.DELETE_TODO}/${id}`); 
    dispatch({
      type: constants.DELETE_TODO_SUCCESS,
      payload: id,
    });
  } catch (err) {
    console.error('deleteTodo...', err);
    dispatch({ type: constants.DELETE_TODO_FAIL });
  }
};
