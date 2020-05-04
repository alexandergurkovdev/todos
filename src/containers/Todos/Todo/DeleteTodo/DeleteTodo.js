import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Modal from '../../../../components/UI/Modal/Modal';
import Button from '../../../../components/UI/Forms/Button/Button';
import Heading from '../../../../components/UI/Headings/Heading';
import Message from '../../../../components/UI/Message/Message';

import * as actions from '../../../../store/actions';

import styled from 'styled-components';

const ButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  position: relative;
  flex-wrap: wrap;

  @media ${props => props.theme.mediaQueries.medium} {
    flex-direction: column;
  }

  button{
    &:first-child{
      @media ${props => props.theme.mediaQueries.medium} {
        margin-bottom: 1.5rem;
      }
    }
  }
`;

const MessageWrapper = styled.div `
  position: absolute;
  bottom: 4rem;
`;

const DeleteTodo = ({show, close, todo, deleteTodo, error, loading, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Modal opened={show} close={close}>
      <Heading size='h2' noMargin>
        Deleting todo
      </Heading>
      <Heading size='h4' bold>
        Are you shure you want to delete this todo?
      </Heading>
      
      <ButtonsWrapper>
        <Button
          disabled={loading}
          loading={loading ? 'Deleting...' : null}
          onClick={() => deleteTodo(todo.id)}
          deleted
          contain
          type="submit"
        >
          Delete
        </Button>
        <Button
          onClick={close}
          contain
        >Cancel</Button>
      </ButtonsWrapper>
      <MessageWrapper>
        <Message error show={error}>{error}</Message>
      </MessageWrapper>
    </Modal>
  )
};

const mapStateToProps = ({todos}) => ({
  error: todos.deleteTodo.error,
  loading: todos.deleteTodo.loading
});

const mapDispatchToProps = {
  deleteTodo: actions.deleteTodo,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteTodo);
