import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled(Link) `
  color: var(--color-whiteColor);
  font-size: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Logo = () => {
  return (
    <LogoWrapper to="/">
      Todos
    </LogoWrapper>
  )
};

export default Logo;
