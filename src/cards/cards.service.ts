import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { IsString, MaxLength } from 'class-validator';
import { Column } from 'src/columns/column.entity';
export class CardDto {
  @IsString()
  @MaxLength(255)
  title: string;
  @IsString()
  description: string;
}

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Column)
    private columnRepository: Repository<Column>,

    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  async create(
    columnId: number,
    { title, description }: CardDto,
  ): Promise<Card> {
    const column = await this.columnRepository.findOneBy({ id: columnId });
    if (column === null) {
      throw new NotFoundException();
    }
    const card = this.cardRepository.create();
    card.title = title;
    card.description = description;
    card.column = column;
    return this.cardRepository.save(card);
  }

  async findAll(columnId: number): Promise<Card[]> {
    return this.cardRepository.findBy({ column: { id: columnId } });
  }

  async findOne(columnId: number, id: number): Promise<Card | null> {
    return this.cardRepository.findOneBy({ column: { id: columnId }, id });
  }

  async update(
    columnId: number,
    id: number,
    { title, description }: CardDto,
  ): Promise<Column> {
    const column = await this.columnRepository.findOneBy({ id: columnId });
    if (column === null) {
      throw new NotFoundException();
    }
    const card = await this.cardRepository.findOneBy({ id });
    if (card === null) {
      throw new NotFoundException();
    }
    card.title = title;
    card.description = description;
    return this.columnRepository.save(card);
  }

  remove(id: number): Promise<any> {
    return this.cardRepository.delete(id);
  }
}
