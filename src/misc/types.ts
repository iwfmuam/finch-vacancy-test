export type TicketType = {
  id: string;
  firstField: number[];
  secondField: number[];
};

export type addTicketType = () => void;
export type randomizeTicketType = (ticketID: TicketType['id']) => void;
export type toggleFieldCheckboxType = (
  ticketID: TicketType['id'],
  index: TicketType['firstField'][0],
  fieldName: keyof Pick<TicketType, 'firstField' | 'secondField'>
) => void;

export type submitTicketArgsType = {
  selectedNumber: {
    firstField: number[];
    secondField: number[];
  };
};

export type submitTicketReturnType = {
  isTicketWon: boolean;
  correctTicket: {
    firstField: number[];
    secondField: number[];
  };
};
