import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import * as actions from '../../../store/actions';
import {FormWrapper, StyledForm, TitlesWrapper, Container} from '../../../hoc/layout/elements';
import Heading from '../../../components/UI/Headings/Heading';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Message from '../../../components/UI/Message/Message';

import styled from 'styled-components';

const MessageWrapper = styled.div `
  position: absolute;
  bottom: -1.5rem;
`;

const RecoverSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.')
});

const RecoverPassword = ({sendEmail, error, loading, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      validationSchema={RecoverSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await sendEmail(values);
        setSubmitting(false);
      }}
    >
      {({isSubmitting, isValid}) => (
        <Container>
          <FormWrapper>
            <TitlesWrapper>
              <Heading noMargin size='h2' color='white'>
                Recover your password
              </Heading>
              <Heading size='h4' bold color='white'>
                Type in your email to recover a password
              </Heading>
            </TitlesWrapper>
            <StyledForm>
              <Field
                type='email'
                name='email'
                placeholder='Type your email...'
                component={Input}
              />
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                loading={loading ? 'Sending recover email...' : null}
              >
                Recover email
              </Button>
              <MessageWrapper>
                <Message error show={error}>{error}</Message>
              </MessageWrapper>
              <MessageWrapper>
                <Message success show={error === false}>
                  Recover email sent success successfully
                </Message>
              </MessageWrapper>
            </StyledForm>
          </FormWrapper>
        </Container>
      )}
    </Formik>
  )
};

const mapStateToProps = ({auth}) => ({
  loading: auth.recoverPassword.loading,
  error: auth.recoverPassword.error
});

const mapDispatchToProps = {
  sendEmail: actions.recoverPassword,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
