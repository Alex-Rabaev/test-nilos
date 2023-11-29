import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from '../account/account.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'from' })
  from: Account;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'to' })
  to: Account;

  @Column('bigint')
  amount: number;

  @Column()
  transactionHash: string;
}
