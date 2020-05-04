import * as actions from './actionTypes';

// Add a todo
export const addTodo = data => async(dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.ADD_TODO_START});
  try {
    const res = await firestore.collection('todos').doc(userId).get();
    const newTodo = {
      id: new Date().valueOf(),
      todoTitle: data.todoTitle,
      todoDescr: data.todoDescr,
      isDone: false,
      isImportant: false
    };

    if (!res.data()) {
      firestore.collection('todos').doc(userId).set({
        todos: [
          newTodo
        ]
      });
    } else {
      firestore.collection('todos').doc(userId).update({
        todos: [
          ...res.data().todos,
          newTodo
        ]
      });
    }

    dispatch({type: actions.ADD_TODO_SUCCESS});
    return true;
  } catch (err) {
    dispatch({type: actions.ADD_TODO_FAIL, payload: err.message});
  }
};

// Delete todo
export const deleteTodo = id => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.DELETE_TODO_START});
  try {
    const res = await firestore.collection('todos').doc(userId).get();
    const previouTodos = res.data().todos;
    const newTodos = previouTodos.filter(todo => todo.id !== id);

    await firestore.collection('todos').doc(userId).update({
      todos: newTodos
    });

    dispatch({type: actions.DELETE_TODO_SUCCESS});
  } catch (err) {
    dispatch({type: actions.DELETE_TODO_FAIL, payload: err.message});
  }
};

// Edit ToDo
export const editTodo = (id, data) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  dispatch({type: actions.EDIT_TODO_START});
  try {
    const res = await firestore.collection('todos').doc(userId).get();
    const todos = res.data().todos;
    const index = todos.findIndex(todo => todo.id === id);
    todos[index].todoTitle = data.todoTitle;
    todos[index].todoDescr = data.todoDescr;

    await firestore.collection('todos').doc(userId).update({
      todos
    });
    dispatch({type: actions.EDIT_TODO_SUCCESS});
    return true;
  } catch (err) {
    dispatch({type: actions.EDIT_TODO_FAIL, payload: err.message});
  }
};

// Done ToDo
export const doneTodo = (id, isDone) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  const res = await firestore.collection('todos').doc(userId).get();
  const todos = res.data().todos;
  const index = todos.findIndex(todo => todo.id === id);
  todos[index].isDone = isDone;

  await firestore.collection('todos').doc(userId).update({
    todos
  });
};

// important ToDo
export const importantTodo = (id, isImportant) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore();
  const userId = getState().firebase.auth.uid;
  const res = await firestore.collection('todos').doc(userId).get();
  const todos = res.data().todos;
  const index = todos.findIndex(todo => todo.id === id);
  todos[index].isImportant = isImportant;

  await firestore.collection('todos').doc(userId).update({
    todos
  });
};
