import React from 'react';
import Logo from '../../Logo/Logo';
import {Container} from "../../../hoc/layout/elements";
import NavItems from '../NavItems/NavItems';
import styled from 'styled-components';

const FixedWrapper = styled.div `
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 20;

  @media  ${props => props.theme.mediaQueries.medium} {
    display: none;
  }
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: space-between;
  height: 100%;
`;

export const Navbar = ({loggedIn}) => {
  return (
    <FixedWrapper>
      <Container>
        <Wrapper>
        <Logo />
          <NavItems loggedIn={loggedIn} />
        </Wrapper>
      </Container>
    </FixedWrapper>
  )
};

export default Navbar;
