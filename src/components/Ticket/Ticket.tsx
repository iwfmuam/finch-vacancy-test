import { PropsWithChildren, useState } from 'react';
import { API } from '../../API';
import {
  randomizeTicketType,
  submitTicketReturnType,
  TicketType,
  toggleFieldCheckboxType,
} from '../../misc/types';
import { Field } from '../Field/Field';

import magicWandSVGPath from '../../static/magic-wand.svg';
import { TicketStyles } from './TicketStyles';
import {
  FIRST_FIELD_MAX_LENGTH,
  FIRST_FIELD_REQUIRED_LENGTH,
  SECOND_FIELD_MAX_LENGTH,
  SECOND_FIELD_REQUIRED_LENGTH,
} from '../../misc/constants';

export function Ticket(
  props: PropsWithChildren<
    TicketType & {
      toggleFieldCheckbox: toggleFieldCheckboxType;
      randomizeTicket: randomizeTicketType;
      count: number;
    }
  >
) {
  const [fetchStatus, setFetchStatus] = useState<
    | { type: 'initial' }
    | { type: 'pending' }
    | {
        type: 'resolved';
        result: submitTicketReturnType;
      }
    | { type: 'rejected'; reason: string }
  >({ type: 'initial' });

  function handleSubmitTicket() {
    setFetchStatus({ type: 'pending' });

    API.submitTicket({
      selectedNumber: {
        firstField: props.firstField,
        secondField: props.secondField,
      },
    })
      .then(({ correctTicket, isTicketWon }) => {
        setFetchStatus({
          type: 'resolved',
          result: { isTicketWon, correctTicket },
        });
      })
      .catch((reason) => {
        setFetchStatus({ type: 'rejected', reason });
      });
  }

  if (fetchStatus.type === 'resolved') {
    const myFirst = props.firstField.map((el) => el + 1);
    const mySecond = props.secondField.map((el) => el + 1);

    const correctFirst = fetchStatus.result.correctTicket.firstField.map(
      (el) => el + 1
    );
    const correctSecond = fetchStatus.result.correctTicket.secondField.map(
      (el) => el + 1
    );

    return (
      <article css={TicketStyles} data-ticket-id={props.id}>
        <div className="top">
          <h1>Билет {props.count}</h1>
        </div>
        <div className="result">
          <p>
            {fetchStatus.result.isTicketWon
              ? 'Ого, вы выиграли! Поздравляем!'
              : 'О нет, вы проиграли... Не унывайте!'}
          </p>
          <h2>Это ваши данные</h2>
          <code>
            {JSON.stringify({
              firstField: myFirst,
              secondField: mySecond,
            })}
          </code>
          <h2>Это данные сервера</h2>
          <code>
            {JSON.stringify({
              firstField: correctFirst,
              secondField: correctSecond,
            })}
          </code>
        </div>
      </article>
    );
  }

  return (
    <article css={TicketStyles} data-ticket-id={props.id}>
      <div className="top">
        <h1>Билет {props.count}</h1>

        <button onClick={() => props.randomizeTicket(props.id)}>
          <img src={magicWandSVGPath} alt="волшебная палочка" />
        </button>
      </div>

      <Field
        title="Поле 1"
        maxLength={FIRST_FIELD_MAX_LENGTH}
        requiredLength={FIRST_FIELD_REQUIRED_LENGTH}
        chosenOptions={props.firstField}
        toggleCheckbox={(index) =>
          props.toggleFieldCheckbox(props.id, index, 'firstField')
        }
      />

      <Field
        title="Поле 2"
        maxLength={SECOND_FIELD_MAX_LENGTH}
        requiredLength={SECOND_FIELD_REQUIRED_LENGTH}
        chosenOptions={props.secondField}
        toggleCheckbox={(index) =>
          props.toggleFieldCheckbox(props.id, index, 'secondField')
        }
      />

      <button
        className="submit"
        disabled={
          props.firstField.length !== FIRST_FIELD_REQUIRED_LENGTH ||
          props.secondField.length !== SECOND_FIELD_REQUIRED_LENGTH
        }
        onClick={handleSubmitTicket}
      >
        Показать результат
      </button>
      <p>
        {fetchStatus.type === 'pending' && 'Загрузка...'}
        {fetchStatus.type === 'rejected' && fetchStatus.reason}
      </p>
    </article>
  );
}
