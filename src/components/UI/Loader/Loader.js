import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div `
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${({isWhite}) => (isWhite ? 'var(--color-whiteColor)' : 'var(--color-main)')};
`;

const StyledLoader = styled.div `
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & div{
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid ${({isWhite}) => (isWhite ? 'var(--color-whiteColor)' : 'var(--color-main)')};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({isWhite}) => (isWhite ? 'var(--color-whiteColor)' : 'var(--color-main)')} transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }

    &:nth-child(2) {
      animation-delay: -0.3s;
    }

    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({isWhite}) => {
  return (
    <LoaderWrapper isWhite={isWhite}>
      <StyledLoader isWhite={isWhite}>
        <div />
        <div />
        <div />
        <div />
      </StyledLoader>
      Loading...
    </LoaderWrapper>
  )
};

export default Loader;
