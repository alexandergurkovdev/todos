import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {StyledForm} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Modal from '../../../components/UI/Modal/Modal';
import Message from '../../../components/UI/Message/Message';

import * as actions from '../../../store/actions';


import styled from 'styled-components';

const MessageWrapper = styled.div `
  position: absolute;
  bottom: 0;
`;

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

const toDoSchema = Yup.object().shape({
  todoTitle: Yup.string()
    .required('The todo title is required.')
    .min(4, 'Todo title short...'),
  todoDescr: Yup.string()
    .min(4, 'Todo description short...')
});

const InputTodo = ({close, opened, addTodo, loading, error, editTodo, editTodoAction, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const loadingText = editTodo ? 'Editing...' : 'Adding...';

  return (
    <React.Fragment>
      <Modal
        opened={opened}
        close={close}
      >
        <Heading noMargin size="h2">
          {editTodo ? 'Edit your todo' : 'Add your new todo'}
        </Heading>
        <Heading bold size="h4">
          {editTodo ? 'Edit your todo and press edit' : 'Type your todo and press add'}
        </Heading>
        <Formik
          initialValues={{
            todoTitle: editTodo ? editTodo.todoTitle : '',
            todoDescr: editTodo ? editTodo.todoDescr : ''
          }}
          validationSchema={toDoSchema}
          onSubmit={async (values, {setSubmitting, resetForm}) => {
            const res = editTodo ? await editTodoAction(editTodo.id, values) : await addTodo(values);

            setSubmitting(false);
            if (res) {
              close();
            }
            resetForm();
          }}
        >
          {({isSubmiting, isValid, resetForm}) => (
            <StyledForm>
              <Field
                type='text'
                name='todoTitle'
                placeholder='Write your todo title'
                component={Input}
              />
              <Field
                type='text'
                name='todoDescr'
                placeholder='Write your todo description'
                component={Input}
              />
              <ButtonsWrapper>
                <Button
                  disabled={!isValid || isSubmiting}
                  loading={loading  ? loadingText : null}
                  deleted
                  contain
                  type="submit"
                >
                  {editTodo ? 'Edit todo' : 'Add todo'}
                </Button>
                <Button
                  onClick={() => {
                    resetForm();
                    close();
                  }}
                  type="button"
                  contain
                >Cancel</Button>
              </ButtonsWrapper>
              <MessageWrapper>
                <Message error show={error}>{error}</Message>
              </MessageWrapper>
            </StyledForm>
          )}
        </Formik>
      </Modal>
    </React.Fragment>
  )
};

const mapStateToProps = ({todos}) => ({
  loading: todos.loading,
  error: todos.error
});

const mapDispatchToProps = {
  addTodo: actions.addTodo,
  editTodoAction: actions.editTodo,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(InputTodo);
