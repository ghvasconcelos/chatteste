import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style: none;
      text-decoration: none;
      font-family: 'Nunito', sans-serif;
      outline: none;
      border: none;
  };

  html{
    scroll-behavior: smooth;
  }

  body {
    width: 100%;

    background: #F1F1F1;

    &::-webkit-scrollbar{
      padding-right: 2px;
      width: 8px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb{
      border-radius: 8px;
      background: $black-light;
    }
  };
`;