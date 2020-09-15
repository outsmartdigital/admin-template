import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100vh;
    width: 100vw;
    max-width: 100%;
  }

  html {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  body, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  #__next { height: 100%; }
`;
