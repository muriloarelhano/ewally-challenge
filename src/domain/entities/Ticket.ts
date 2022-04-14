export interface TicketResponse {
  status: number;
  amount: string;
  expirationDate: string;
  barCode: string;
  createdAt: string;
}

export interface TicketPayload {
  id?: string;
  lineCode: string;
  amount?: string;
  expirationDate?: string;
  barCode?: string;
}

export enum TicketTypes {
  bank = 'bank',
  agreement = 'agreement',
}

export enum CodeTypes {
  line = 'line',
  bar = 'bar',
}
