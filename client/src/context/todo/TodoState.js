import React, { useReducer } from 'react';
import axios from 'axios';
import TodoContext from './todoContext';
import todoReducer from './todoReducer';
import {
  ADD_TODO,
  GET_TODOS,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_TODO,
  UPDATE_TODO,
  CLEAR_TODOS,
  FILTER_TODO,
  CLEAR_FILTER,
  TODO_ERROR
} from '../types';

const TodoState = props => {
  const initialState = {
    todos: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Get Todos
  const getTodos = async () => {
    try {
      const res = await axios.get('/api/tasks');
      dispatch({
        type: GET_TODOS,
        payload: res.data
      });
    } catch (er) {
      dispatch({
        type: TODO_ERROR,
        payload: err.response.request.responseText
      });
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getTodos,
        addTodo
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoState;