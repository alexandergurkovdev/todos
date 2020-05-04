import React from 'react';
import NavItem from './NavItem/NavItem';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({mobile, clicked, loggedIn}) => {
  let links;

  if (loggedIn.uid) {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link='/'>
          Todos
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/profile'>
          Account
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/logout'>
          Logout
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem clicked={clicked} mobile={mobile} link='/login'>
          Login
        </NavItem>
        <NavItem clicked={clicked} mobile={mobile} link='/signup'>
          SignUp
        </NavItem>
      </Ul>
    );
  }

  return (
    <Nav mobile={mobile}>
      {links}
    </Nav>
  )
}

export default NavItems;
