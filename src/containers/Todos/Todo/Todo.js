import React, {useState} from 'react';

import DeleteTodo from './DeleteTodo/DeleteTodo';
import InputTodo from '../InputTodo/InputTodo';
import DoneTodo from '../DoneTodo/DoneTodo';
import ImportantTodo from '../ImportantTodo/ImportantTodo';
import Heading from '../../../components/UI/Headings/Heading';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 2rem 11rem 2rem 2.5rem;
  background-color: ${({isDone, isImportant}) =>
  (isDone ? 'var(--color-green)' : isImportant ? 'var(--color-yellow)' : 'var(--color-mainDark)')};
  margin-bottom: 2rem;
  border-radius: .5rem;
  color: var(--color-whiteColor);
  box-shadow: 0px 0px 15px 0px var(--shadow);
  position: relative;
  text-align: left;
  transition: .3s all;
`;

const ToDoDescr = styled.div`
  font-size: 1.4rem;
  text-decoration: ${({isDone}) => (isDone ? 'line-through' : 'none')};
  transition: .3s all;
`;

const Control = styled.button`
  margin: 0 1rem;
  padding: 0;
  background: none;
  border: 0;
  color: ${({color}) => (color === 'red' ? 'var(--color-errorRed)' : 'var(--color-mainLight)')};
  transition: .2s all;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.edit-todo{
    color: var(--color-whiteColor);
    right: 3rem;
  }

  &.delete-todo{
    right: 1rem;
  }

  &.complete-toggler{
    right: 5rem;
  }

  &:hover{
    transform: scale(1.2) translateY(-50%);
  }
`;

const Todo = ({todo, color}) => {
  const [isDeleting, setIsDeliting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDone, setIsDone] = useState(todo.isDone);
  const [isImportant, setisImportant] = useState(todo.isImportant);

  return (
    <Wrapper isDone={isDone} isImportant={isImportant}>
      <Heading color='white' size='h4' noMargin bold isDone={isDone}>
        {todo.todoTitle}
      </Heading>
      <ToDoDescr isDone={isDone}>
        {todo.todoDescr}
      </ToDoDescr>
      {
        isDone ? null : <ImportantTodo
          setisImportant={setisImportant}
          isImportant={isImportant}
          todo={todo}
        />
      }
      <DoneTodo
        setIsDone={setIsDone}
        isDone={isDone}
        todo={todo}
      />
      <Control
        color={color = ''}
        className="edit-todo"
        onClick={() => {setIsEditing(true)}}
      >
        <FontAwesomeIcon icon={faEdit} />
      </Control>
      <Control 
        color={color = 'red'}
        className="delete-todo"
        onClick={() => {setIsDeliting(true)}}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Control>
      <DeleteTodo
        show={isDeleting}
        close={() => setIsDeliting(false)}
        todo={todo}
      />
      <InputTodo
        editTodo={todo}
        opened={isEditing}
        close={() => setIsEditing(false)}
      />
    </Wrapper>
  )
};

export default Todo;
