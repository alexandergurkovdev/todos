import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import {FormWrapper, StyledForm, Container, TitlesWrapper} from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Message from '../../../components/UI/Message/Message';
import Modal from '../../../components/UI/Modal/Modal';

import styled from 'styled-components';

const MessageWrapper = styled.div `
  position: absolute;
  bottom: -5rem;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
  color: var(--color-errorRed);
  font-size: 1.3rem;
  text-decoration-color: var(--color-errorRed);
  margin-top: 1rem;
  font-weight: 700;
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

const DeleteMessageWrapper = styled.div`
  bottom: 1px;
  padding: 0 1rem;
  width: 100%;
  z-index: 10;
`;

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Your firstname is required.')
    .min(3, 'Too short')
    .max(25, 'Too long'),
  lastName: Yup.string()
    .required('Your lastname is required.')
    .min(3, 'Too short')
    .max(25, 'Too long'),
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
    .min(8, 'The password is too short'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Pssword doesn't match`)
});

const Profile = ({firebase, editProfile, loading, error, cleanUp, loadingDelete, erroreDelete, deleteUser}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  const [modalOpened, setModalOpened] = useState(false);

  if (!firebase.profile.isLoaded) return null;
  return (
    <Container>
      <Formik
        initialValues={{
          firstName: firebase.profile.firstName,
          lastName: firebase.profile.lastName,
          email: firebase.auth.email,
          password: '',
          confirmPassword: ''
        }}
        validationSchema={ProfileSchema}
        onSubmit={async (values, {setSubmitting}) => {
          await editProfile(values);
          setSubmitting(false);
        }}
      >
        {({isSubmitting, isValid}) => (
          <FormWrapper>
            <Heading noMargin size="h2" color="white">
              Edit your profile
            </Heading>
            <Heading bold size="h4" color="white">
              Here you can edit your profile
            </Heading>
            <StyledForm>
              <Field
                type='text'
                name='firstName'
                placeholder='Your first name...'
                component={Input}
              />
              <Field
                type='text'
                name='lastName'
                placeholder='Your last name...'
                component={Input}
              />
              <Field
                type='email'
                name='email'
                placeholder='Your email...'
                component={Input}
              />
              <Field
                type='password'
                name='password'
                placeholder='Your password...'
                component={Input}
              />
              <Field
                type='password'
                name='confirmPassword'
                placeholder='Re-type your password...'
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                loading={loading ? 'Editing...' : null}
              >
                Edit
              </Button>
              <MessageWrapper>
                <Message error show={error}>{error}</Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>Profile was updated!</Message>
              </MessageWrapper>
            </StyledForm>
            <DeleteWrapper onClick={() => setModalOpened(true)}>Delete my account</DeleteWrapper>
          </FormWrapper>
        )}
      </Formik>
      <Modal
        opened={modalOpened}
        close={() => setModalOpened(false)}
      >
        <TitlesWrapper>
          <Heading noMargin size="h2">
            Delete your account
          </Heading>
          <Heading bold size="h4">
            Do you realy want to delete your account?
          </Heading>
        </TitlesWrapper>
        <ButtonsWrapper>
          <Button
            disabled={loadingDelete}
            loading={loading ? 'Deliting...' : null}
            onClick={() => deleteUser()}
            deleted
            contain
          >
            Delete
          </Button>
          <Button
            onClick={() => setModalOpened(false)}
            contain
          >Cancel</Button>
          <DeleteMessageWrapper>
            <MessageWrapper>
              <Message error show={erroreDelete}>{erroreDelete}</Message>
            </MessageWrapper>
          </DeleteMessageWrapper>
        </ButtonsWrapper>
      </Modal>
    </Container>
  );
};

const mapStateToProps = ({firebase, auth}) => ({
  firebase,
  loading: auth.profileEdit.loading,
  error: auth.profileEdit.error,
  loadingDelete: auth.deleteUser.loading,
  erroreDelete: auth.deleteUser.error
});

const mapDispatchToProps = {
  editProfile: actions.editProfile,
  cleanUp: actions.clean,
  deleteUser: actions.deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
