import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle(({ theme }) => {
  const {
    settings: {
      small: { point_size, line_height },
    },
    color: { baseBackground, base, link },
  } = theme

  return `
      *, *:before, *:after {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
      }
  
      html {
        font-size: 62.5%;
      }
      
      body {
        font-size: ${point_size};
        line-height: ${line_height};
        margin: 0;
        background-color: ${baseBackground};
        color: ${base};
        font-family: 'Baloo 2', cursive,-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        text-rendering: optimizeLegibility;
        transition: color .6s cubic-bezier(0.37, 0, 0.63, 1), background-color .6s cubic-bezier(0.37, 0, 0.63, 1);
      }
  
      html, body {
        min-height: 100%;
      }
      
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
  
      p {
        margin: 0;
        margin-bottom: ${point_size};
      }
  
      a {
        text-decoration: none;
        cursor: pointer;
        color: ${link};
      }
  
      input {
        outline: none;
        background: none;
        border: none;
        padding: .6rem 0;
        text-indent: 1rem;
        color: inherit;
        font-size: inherit;
        transition: all .4s cubic-bezier(1, 0.35, 0, 0.93);
        
        &:focus {
          text-indent: 0;
        }
      }
  
    `
})

export default GlobalStyle
