import * as actions from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  deleteTodo: {
    error: null,
    loading: false
  }
};

// Add ToDo
const addToDoStart = state => {
  return {
    ...state,
    loading: true
  };
};
const addToDoSuccess= state => {
  return {
    ...state,
    loading: false,
    error: false
  };
};
const addToDoFail = (state, payload) => {
  return {
    ...state,
    loading: false,
    error: payload
  };
};

// Delete ToDo
const deleteToDoStart = state => {
  return{
    ...state,
    deleteTodo: {
      ...state.deleteTodo,
      loading: true
    }
  };
};
const deleteToDoSuccess= state => {
  return{
    ...state,
    deleteTodo: {
      ...state.deleteTodo,
      loading: false,
      error: false
    }
  };
};
const deleteToDoFail = (state, payload) => {
  return{
    ...state,
    deleteTodo: {
      ...state.deleteTodo,
      loading: true,
      error: payload
    }
  };
};

const cleanUp = state => {
  return{
    ...state,
    error: null,
    loading: false,
    deleteTodo: {
      ...state.deleteTodo,
      error: null,
      loading: false,
    }
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.CLEAN_UP:
      return cleanUp(state);

    case actions.ADD_TODO_START:
      return addToDoStart(state);

    case actions.ADD_TODO_SUCCESS:
      return addToDoSuccess(state);

    case actions.ADD_TODO_FAIL:
      return addToDoFail(state, payload);

    case actions.DELETE_TODO_START:
        return deleteToDoStart(state);

    case actions.DELETE_TODO_SUCCESS:
        return deleteToDoSuccess(state);

    case actions.DELETE_TODO_FAIL:
        return deleteToDoFail(state, payload);

    default:
      return state;
  }
};

