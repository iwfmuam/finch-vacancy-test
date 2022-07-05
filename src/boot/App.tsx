import produce from 'immer';
import { useCallback, useState } from 'react';
import { Ticket } from '../components/Ticket/Ticket';
import {
  FIRST_FIELD_MAX_LENGTH,
  FIRST_FIELD_REQUIRED_LENGTH,
  SECOND_FIELD_MAX_LENGTH,
  SECOND_FIELD_REQUIRED_LENGTH,
} from '../misc/constants';
import {
  addTicketType,
  randomizeTicketType,
  TicketType,
  toggleFieldCheckboxType,
} from '../misc/types';
import { getRandomSlice } from '../misc/utils';

export function App() {
  const [tickets, setTickets] = useState<TicketType[]>([]);

  const addTicket = useCallback<addTicketType>(() => {
    setTickets(
      produce((draft) => {
        draft.push({
          id: Math.random().toString(36).substring(2, 6),
          secondField: [],
          firstField: [],
        });
      })
    );
  }, []);

  const randomizeTicket = useCallback<randomizeTicketType>((ticketID) => {
    setTickets(
      produce((draft) => {
        const ticket = draft.find(({ id }) => id === ticketID)!;

        ticket.firstField = getRandomSlice(
          FIRST_FIELD_MAX_LENGTH,
          FIRST_FIELD_REQUIRED_LENGTH
        );

        ticket.secondField = getRandomSlice(
          SECOND_FIELD_MAX_LENGTH,
          SECOND_FIELD_REQUIRED_LENGTH
        );
      })
    );
  }, []);

  const toggleFieldCheckbox = useCallback<toggleFieldCheckboxType>(
    (ticketID, index, fieldName) => {
      setTickets(
        produce((draft) => {
          const ticket = draft.find(({ id }) => id === ticketID)!;
          const fieldDeleteIndex = ticket[fieldName].indexOf(index);

          if (fieldDeleteIndex !== -1) {
            ticket[fieldName].splice(fieldDeleteIndex, 1);
          } else {
            if (
              ticket[fieldName].length <
              (fieldName === 'firstField'
                ? FIRST_FIELD_REQUIRED_LENGTH
                : SECOND_FIELD_REQUIRED_LENGTH)
            ) {
              ticket[fieldName].push(index);
            }
          }
        })
      );
    },
    []
  );

  return (
    <>
      {tickets.map((ticket, index) => (
        <Ticket
          key={ticket.id}
          {...ticket}
          toggleFieldCheckbox={toggleFieldCheckbox}
          randomizeTicket={randomizeTicket}
          count={index + 1}
        />
      ))}
      <button id="add-ticket-button" onClick={addTicket}>
        Купите {tickets.length ? 'ещё' : ''} билет
      </button>
    </>
  );
}
