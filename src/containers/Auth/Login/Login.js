import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container, TitlesWrapper, MessageWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import * as actions from '../../../store/actions';
import Message from '../../../components/UI/Message/Message';
import CustomLink from '../../../components/UI/CustomLink/CustomLink';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email.')
    .required('The email is required.'),
  password: Yup.string()
    .required('The password is required.')
    .min(8, 'Too short...')
});

const Login = ({login, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await login(values);
        setSubmitting(false);
      }}
    >
      {({isSubmiting, isValid}) => (
        <Container>
          <FormWrapper>
            <TitlesWrapper>
              <Heading noMargin size="h2" color="white">
                Login into your account
              </Heading>
              <Heading bold size="h4" color="white">
                Fill in your details to login into your account
              </Heading>
            </TitlesWrapper>
            <StyledForm>
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
              <Button
                disabled={!isValid || isSubmiting}
                type="submit"
                loading={loading ? 'Logging in...' : null}
              >
                Login
              </Button>
              <CustomLink link="/recover" color='white'>
                Forgot your password?
              </CustomLink>
              <MessageWrapper>
                <Message error show={error}>{error}</Message>
              </MessageWrapper>
            </StyledForm>
          </FormWrapper>
        </Container>
      )}
    </Formik>
  );
};

const mapStateToProps = ({auth}) => ({
  loading: auth.loading,
  error: auth.error
});

const mapDispatchToProps = {
  login: actions.signIn,
  cleanUp: actions.clean
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
