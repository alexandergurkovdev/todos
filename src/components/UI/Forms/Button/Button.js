import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button `
  width: ${({contain}) => (contain ? 'auto' : '100%')};
  padding: 1.2rem 6rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  color: var(--color-whiteColor);
  font-weight: 700;
  background-color: ${({deleted}) => (deleted ? 'var(--color-errorRed)' : 'var(--color-mainDark)')};
  transition: all 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
  &:active {
    transform: translateY(2px);
  }
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-textColor);
    color: var(--color-whiteColor);
  }
`;

const Button = ({children, disabled, loading, deleted, contain, ...rest}) => {
  return (
    <StyledButton contain={contain} deleted={deleted} disabled={disabled} {...rest}>
      {loading ? loading : children}
    </StyledButton>
  )
};

export default Button;
