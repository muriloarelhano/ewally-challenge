import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
export interface TicketResponse {
  status: number;
  amount: string;
  expirationDate: string;
  barCode: string;
  createdAt: string;
}

export interface TicketPayload {
  id?: string;
  code: string;
  amount?: string;
  expirationDate?: string;
  barCode?: string;
}

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  amount: string;

  @Column({ name: 'expiration_date' })
  expirationDate: string;

  @Column({ name: 'bar_code' })
  barCode: string;

  @CreateDateColumn()
  createdAt: Date;
}
