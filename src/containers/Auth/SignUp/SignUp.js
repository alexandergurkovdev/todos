import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {Container, TitlesWrapper, MessageWrapper, StyledForm, FormWrapper} from '../../../hoc/layout/elements';
import Input from '../../../components/UI/Forms/Input/Input';
import Button from '../../../components/UI/Forms/Button/Button';
import Heading from '../../../components/UI/Headings/Heading';
import Message from '../../../components/UI/Message/Message';
import * as actions from '../../../store/actions';

const SignUpSchema = Yup.object().shape({
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
    .required('The password is required.')
    .min(8, 'The password is too short'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], `Pssword doesn't match`)
    .required('You need to confirm your password.')
});

const SignUp = ({signUp, loading, error, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);
  
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, {setSubmitting}) => {
        await signUp(values);
        setSubmitting(false);
      }}
    >
      {({isSubmitting, isValid}) => (
        <Container>
          <FormWrapper>
            <TitlesWrapper>
              <Heading noMargin size="h2" color="white">
                Sign up for an account
              </Heading>
              <Heading bold size="h4" color="white">
                Fill in your details to register your new account
              </Heading>
            </TitlesWrapper>
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
                loading={loading ? 'Signing up...' : null}
              >SignUp</Button>
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
  signUp: actions.signUp,
  cleanUp: actions.clean
};


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
