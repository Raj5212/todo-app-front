// todoReducer.js
import * as constants from '../constant';

const initialState = {
  loading: false,
  todos: [], 
  error: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
};

export default function todoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Fetch To-Do list
    case constants.TODO_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case constants.TODO_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: payload, // Store fetched To-Dos
      };

    case constants.TODO_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload, // Store the error message
      };

    // Create a new To-Do
    case constants.CREATE_TODO:
      return {
        ...state,
        isCreating: true,
      };

    case constants.TODO_SUCCESS:
      return {
        ...state,
        isCreating: false,
        todos: [...state.todos, payload], // Add the new To-Do to the list
      };

    case constants.TODO_FAIL:
      return {
        ...state,
        isCreating: false,
        error: payload, // Store the error message
      };

    // Update a To-Do
    case constants.UPDATE_TODO_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };

    case constants.UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        todos: state.todos.map((todo) =>
          todo.id === payload.id ? { ...todo, ...payload } : todo // Update the specific To-Do
        ),
      };

    case constants.UPDATE_REQUEST_FAIL:
      return {
        ...state,
        isUpdating: false,
        error: payload, // Store the error message
      };

    // Delete a To-Do
    case constants.DELETE_TODO_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };

    case constants.DELETE_TODO_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        todos: state.todos.filter((todo) => todo.id !== payload), // Remove the deleted To-Do
      };

    case constants.DELETE_TODO_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: payload, // Store the error message
      };

    default:
      return state;
  }
}
