import { css } from '@emotion/react';

export const FieldStyles = css`
  display: block;
  text-align: left;
  font-size: 1.4rem;

  & > span {
    margin: 0.8rem;
    font-weight: 300;
  }

  .button-group {
    margin: 1rem 0;
    display: flex;
    flex-wrap: wrap;

    & > * {
      flex-grow: 0;
      flex-shrink: 0;

      font-size: 1.4rem;
      color: black;

      width: 4rem;
      height: 4rem;

      border: 1px solid #dddddd;
      border-radius: 0.5rem;

      &[data-is-checked='true'] {
        background-color: #ffd205;

        width: 3.4rem;
        height: 3.4rem;

        margin: 0.3rem;
      }
    }
  }
`;
