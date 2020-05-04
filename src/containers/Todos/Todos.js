import React, {useState} from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';

import {Container} from '../../hoc/layout/elements';
import Heading from '../../components/UI/Headings/Heading';
import InputTodo from './InputTodo/InputTodo';
import Loader from '../../components/UI/Loader/Loader';
import Todo from './Todo/Todo';
import Button from '../../components/UI/Forms/Button/Button';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 6rem);
  align-self: flex-start;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5rem 0;
  flex-direction: column;
  align-items: center;
  max-width: 70rem;
  margin: 0 auto;
`;

const Content = styled.div`
  width: 100%;
  margin-top: 4rem;
  text-align: center;
`;

const Filter = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const FilterBtn = styled.button `
  padding: .5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: none;
  color: var(--color-mainDark);
  border: 1px solid var(--color-mainDark)!important;
  border-radius: .5rem;
  margin: 0 .5rem;

  &.active{
    color: var(--color-whiteColor);
    background: var(--color-mainDark);
    transition: .3s all;
  }
`;

const Todos = ({todos, userId}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState('all');

  let content;

  if (!todos) {
    content = (
      <Content>
        <Loader />
      </Content>
    )
  } else if (!todos[userId] || !todos[userId].todos) {
    content = (
      <Content>
        <Container>
          <Heading size='h2'>You have no todos!</Heading>
        </Container>
      </Content>
    )
  } else if (todos[userId].todos.length === 0) {
    content = (
      <Content>
        <Container>
          <Heading size='h2'>You have no todos!</Heading>
        </Container>
      </Content>
    )
  } else {
    content = (
      <Content>
        <Filter>
          <FilterBtn
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </FilterBtn>
          <FilterBtn
            className={filter === 'active' ? 'active' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </FilterBtn>
          <FilterBtn
            className={filter === 'done' ? 'active' : ''}
            onClick={() => setFilter('done')}
          >
            Done
          </FilterBtn>
        </Filter>
        {
          filter === 'all' ?
          todos[userId].todos.slice(0).reverse().map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
            />
          ) :
          filter === 'active' ?
          todos[userId].todos.filter(item => !item.isDone).slice(0).reverse().map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
            />
          ) : filter === 'done' ?
          todos[userId].todos.filter(item => item.isDone).slice(0).reverse().map(todo =>
            <Todo
              key={todo.id}
              todo={todo}
            />
          ) : null
        }
      </Content>
    )
  }

  return (
    <Wrapper>
      <Container>
        <InnerWrapper>
          <Heading bold noMargin size="h1">
            Your todos
          </Heading>
          <Heading bold size="h4">
            All tou have to do for now...
          </Heading>
          <Button
            contain
            onClick={() => setIsAdding(true)}
          >
            Add ToDo
          </Button>
          <InputTodo
            opened={isAdding}
            close={() => setIsAdding(false)}
          />
          {content}
        </InnerWrapper>
      </Container>
    </Wrapper>
  )
};

const mapStateToProps = ({firebase, firestore}) => ({
  userId: firebase.auth.uid,
  todos: firestore.data.todos,
  requesting: firestore.status.requesting
});

export default compose(
  connect(mapStateToProps, null),
  firestoreConnect(props => [
    `todos/${props.userId}`
  ])
)(Todos);
