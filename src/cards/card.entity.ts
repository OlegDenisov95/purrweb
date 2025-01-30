import { Entity, PrimaryGeneratedColumn, Column as Col, ManyToOne, OneToMany } from 'typeorm';
import { Column } from '../columns/column.entity';
import { Comment } from '../comments/comment.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Col()
  title: string;

  @Col({ nullable: true })
  description: string;

  @ManyToOne(() => Column, (column) => column.cards, { onDelete: 'CASCADE' })
  column: Column;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];
}