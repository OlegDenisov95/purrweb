
import { Entity, Column as Col, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Column } from '../columns/column.entity';
import { Exclude } from 'class-transformer';

@Entity('users') 
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Col({ unique: true }) 
  email: string;

  @Col() 
  @Exclude()
  password: string;

  @OneToMany(() => Column, (column) => column.user)_
  columns: Column[];
}