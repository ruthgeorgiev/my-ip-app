// src/components/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f7f8fa;
    margin: 0;
    padding: 0;
    height: 100vh;
    overflow: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  #root {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles;
