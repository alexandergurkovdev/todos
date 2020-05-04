import React, {useState} from 'react';
import styled from 'styled-components';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Hamburger from '../SideDrawer/Hamburger/Hamburger';

const FixedWrapper = styled.div `
  position: fixed;
  background-color: var(--color-mainDark);
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  height: 6rem;
  z-index: 10;
  display: none;
  @media  ${props => props.theme.mediaQueries.medium} {
    display: flex;
  }
`;

const Wrapper = styled.div `
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  align-items: center;
`;

const Menu = styled.div `
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-mainDark);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  visibility: ${props => (props.opened ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.opened ? '0%' : '-100%')});
  transition: all .1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  margin-top: 6rem;
  display: none;
  z-index: 10;
  @media  ${props => props.theme.mediaQueries.medium} {
    display: flex;
  }
`;

export const SideDrawer = ({loggedIn}) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <React.Fragment>
      <FixedWrapper>
        <Wrapper>
          <Logo />
          <Hamburger opened={isOpened} clicked={() => setIsOpened(!isOpened)} />
        </Wrapper>
      </FixedWrapper>
      <Menu opened={isOpened}>
        <NavItems loggedIn={loggedIn} mobile clicked={() => setIsOpened(false)} />
      </Menu>
    </React.Fragment>
  )
};

export default SideDrawer;
