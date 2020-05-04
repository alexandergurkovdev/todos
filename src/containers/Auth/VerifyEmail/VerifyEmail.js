import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Heading from '../../../components/UI/Headings/Heading';
import Button from '../../../components/UI/Forms/Button/Button';
import Message from '../../../components/UI/Message/Message';
import {Container, TitlesWrapper, MessageWrapper, FormWrapper} from '../../../hoc/layout/elements';
import * as actions from '../../../store/actions';

import styled from 'styled-components';

const Wrapper = styled.div `
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerifyEmail = ({sendVerification, error, loading, cleanUp}) => {
  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, [cleanUp]);

  return (
    <Container>
      <FormWrapper>
        <Wrapper>
          <TitlesWrapper>
            <Heading noMargin size='h2' color='white'>
              Verify your email
            </Heading>
            <Heading size='h4' bold color='white'>
              Go to tour email inbox, and please verify your email
            </Heading>
          </TitlesWrapper>
          <Button
            loading={loading ? 'Sending email...' : null}
            onClick={() => sendVerification()}
            disabled={loading}
          >
            Re-send verification email
          </Button>
          <MessageWrapper>
            <Message error show={error}>{error}</Message>
          </MessageWrapper>
          <MessageWrapper>
            <Message success show={error === false}>Message sent success successfully</Message>
          </MessageWrapper>
        </Wrapper>
      </FormWrapper>
    </Container>
  )
};

const mapStateToProps = ({auth}) => ({
  loading: auth.verifyEmail.loading,
  error: auth.verifyEmail.error
});

const mapDispatchToProps = {
  sendVerification: actions.verifyEmail,
  cleanUp: actions.clean
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
