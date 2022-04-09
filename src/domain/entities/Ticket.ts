export interface TicketResponse {
  status: number;
  amount: string;
  expirationDate: string;
  barCode: string;
}

export interface TicketPayload {
  code: string;
}
