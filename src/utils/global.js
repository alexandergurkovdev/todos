import {createGlobalStyle} from "styled-components";

export default createGlobalStyle `
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    outline: none;
  }

  html {
    font-size: 62.5%;
    box-sizing: border-box;
    --color-main: ${props => props.theme.colors.main};
    --color-mainDark: ${props => props.theme.colors.mainDark};
    --color-mainLight: ${props => props.theme.colors.mainLight};
    --color-mainLighter: ${props => props.theme.colors.mainLighter};
    --color-textColor: ${props => props.theme.colors.textColor};
    --color-whiteColor: ${props => props.theme.colors.whiteColor};
    --color-errorRed: ${props => props.theme.colors.errorRed};
    --color-green: ${props => props.theme.colors.green};
    --color-yellow: ${props => props.theme.colors.yellow};
    --shadow: ${props => props.theme.colors.shadow};

    @media ${props => props.theme.mediaQueries.small} {
      font-size: 60%;
    }

    @media ${props => props.theme.mediaQueries.smallest} {
      font-size: 55%;
    }
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.5;
  }

  a, input, textarea, button {
    font-family: inherit;
    text-decoration: none;
  }

  a, button{
    cursor: pointer;
  }
  
  button {
    border: none!important;
  }
`;
