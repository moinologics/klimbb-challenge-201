import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('redemption')
export class Redemption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ type: 'float' })
  amount: number;

  @Column({ type: 'text' })
  status: string;

  @Column({ name: 'created_at', type: 'date', default: new Date() })
  createdAt: Date;
}
