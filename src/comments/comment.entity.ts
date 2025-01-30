import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from '../cards/card.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Card, (card) => card.comments, { onDelete: 'CASCADE' })
  card: Card;
}