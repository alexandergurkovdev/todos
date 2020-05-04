import styled from 'styled-components';
import {Form} from 'formik';

export const Container = styled.div `
  width: 100%;
  max-width: 140rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

export const FormWrapper = styled.div `
  width: 100%;
  max-width: 50rem;
  border-radius: 1rem;
  background-color: var(--color-mainLight);
  box-shadow: 0rem .5rem 3.5rem var(--shadow);
  padding: 3rem 3rem 6rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
`;

export const StyledForm = styled(Form) `
  display: flex;
  width: 100%;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

export const TitlesWrapper = styled.div`
  text-align: center;
`;

export const MessageWrapper = styled.div `
  position: absolute;
  bottom: 0;
`;
