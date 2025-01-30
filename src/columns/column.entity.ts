
import { Entity, Column as Col, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Card } from '../cards/card.entity';

@Entity('columns') 
export class Column {
  @PrimaryGeneratedColumn()
  id: number;

  @Col() 
  content: string;

  @ManyToOne(() => User, (user) => user.columns, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Card, (card) => card.column)
  cards: Card[];
}