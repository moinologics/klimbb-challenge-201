import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('game_session')
export class GameSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  userId: number;

  @Column({ name: 'amount_played', type: 'float' })
  amountPlayed: number;

  @Column({ name: 'created_at', type: 'date', default: new Date() })
  createdAt: Date;
}
