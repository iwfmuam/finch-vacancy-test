import { css, Global } from '@emotion/react';
import { PropsWithChildren } from 'react';
import normailize from 'normalize.css';

export const GlobalStyles = (props: Required<PropsWithChildren<{}>>) => (
  <>
    <Global
      styles={css`
        ${normailize}

        *, ::before, ::after {
          box-sizing: inherit;
        }

        :root {
          font-size: 62.5%;
          box-sizing: border-box;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          font-family: 'Roboto', sans-serif;
          font-size: 1.6em;
        }

        #root {
          background: linear-gradient(#4568dc, #b06ab3), #ef8e48;
          text-align: center;

          min-height: 100vh;
          padding: 1.2rem;
        }

        button {
          background: white;
          border: none;
        }

        #add-ticket-button {
          padding: 1.3rem 2.1rem;
          border: 1px solid #333333;
          border-radius: 1rem;
        }
      `}
    />
    {props.children}
  </>
);
