import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
export interface TicketResponse {
  status: number;
  amount: string;
  expirationDate: string;
  barCode: string;
}

export interface TicketPayload {
  code: string;
}

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  amount: string;

  @Column()
  expirationDate: string;

  @Column()
  barCode: string;
}
