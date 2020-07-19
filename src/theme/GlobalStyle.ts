import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  };

  html,
  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    height: 100%
  };

  body > div:first-child,
  div#__next,
  div#__next > div:first-child {
    height: 100%;
  }

  ul, li {
    margin: 0;
    padding: 0;
  };

  input, button, textarea, select {
    appearance: none;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    border-radius: 0;
  };

  button {
    background-color: transparent;
    cursor: pointer;
  };

  a {
    text-decoration: none;
  };
`;
