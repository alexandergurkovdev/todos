import React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

const Li = styled.li `
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink) `
  display: flex;
  text-transform: uppercase;
  align-items: center;
  border-bottom: ${props => (props.mobile ? '1px solid transparent' : '1px solid transparent')};
  font-size: 1.2rem;
  padding: ${props => (props.mobile ? '.5rem 1rem' : '1rem')};
  margin: ${props => (props.mobile ? '2rem 0' : '0 1rem')};
  font-weight: 400;
  color: var(--color-whiteColor);
  transition: all 0.2s;
  &:hover {
    border-bottom: ${props => (props.mobile ? '1px solid var(--color-whiteColor)' : '1px solid var(--color-whiteColor)')};
  }
  &.active{
    border-bottom: ${props =>
    (props.mobile
      ? '1px solid var(--color-whiteColor)'
      : '2px solid var(--color-whiteColor)')};
  }
`;

const NavItem = ({link, children, mobile, clicked}) => {
  return (
    <Li>
      <StyledNavLink
        onClick={clicked}
        exact
        activeClassName="active"
        mobile={mobile ? 1 : 0}
        to={link}
      >
        {children}
      </StyledNavLink>
    </Li>
  );
}

export default NavItem;
