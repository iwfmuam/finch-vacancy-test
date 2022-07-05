import { css } from '@emotion/react';

export const TicketStyles = css`
  max-width: 76.8rem;

  margin: 0 auto 1.7rem;
  padding: 1.4rem 1.1rem;

  border-radius: 0.3rem;
  background-color: #ffffff;

  .top {
    display: flex;
    margin-bottom: 1.2rem;

    & > h1 {
      flex: 1;

      margin: 0;
      text-align: left;
      font-size: 1.6rem;
    }
  }

  h2 {
    font-size: 1.6rem;
  }

  .submit {
    color: #333333;
    padding: 1.3rem 2.1rem;
    border: 1px solid;
    border-radius: 4rem;

    &[disabled],
    &:disabled {
      color: #777777;
    }
  }
`;
