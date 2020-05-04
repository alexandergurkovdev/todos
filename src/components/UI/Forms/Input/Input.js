import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div `
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 4.5rem;
  }
`;

const StyledInput = styled.input `
  padding: 1rem 1.5rem;
  background-color: var(--color-whiteColor);
  border: 1px solid var(--color-main);
  color: var(--color-main);
  font-weight: 500;
  font-size: 1.4rem;
  border-radius: .5rem;
  width: 100%;

  &:hover, &:focus{
    border: 1px solid var(--color-mainDark);
    color: var(--color-mainDark);
  }

  &::placeholder{
    color: var(--color-main);
  }
`;

const Error = styled.div `
  color: var(--color-errorRed);
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0rem 1.5rem;
  visibility: ${({show}) => (show ? 'visible' : 'hidden')};
  opacity: ${({show}) => (show ? '1' : '0')};
  transform: translateY(${({show}) => (show ? '20px' : '10px')});
  transition: all .1s;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const Input = ({field, form: {touched, errors}, ...props}) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>{errors[field.name]}</Error>
    </InputWrapper>
  );
};

export default Input;
