import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { IsString, MaxLength } from 'class-validator';
import { Card } from 'src/cards/card.entity';

export class CommentDto {
  @IsString()
  @MaxLength(255)
  content: string;
}


@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(cardId: number, { content }: CommentDto): Promise<Comment> {
    const card = await this.cardRepository.findOneBy({ id: cardId });
    if (card === null) {
      throw new NotFoundException();
    }

    const comment = this.commentRepository.create();
    comment.content = content;
    comment.card = card;
    
    return this.commentRepository.save(comment);
  }

  async findAll(cardId: number): Promise<Comment[]> {
    return this.commentRepository.findBy({ card: { id: cardId } });
  }

  async findOne(cardId: number, id: number): Promise<Comment | null> {
    return this.commentRepository.findOneBy({ card: { id: cardId }, id });
  }

  async update(
    cardId: number,
    id: number,
    { content }: CommentDto,
  ): Promise<Comment> {
    const card = await this.cardRepository.findOneBy({ id: cardId });
    if (card === null) {
      throw new NotFoundException();
    }

    const comment = await this.commentRepository.findOneBy({ id });
    if (comment === null) {
      throw new NotFoundException();
    }

    comment.content = content;
    comment.card = card;
    return this.commentRepository.save(card);
  }

  remove(id: number): Promise<any> {
    return this.commentRepository.delete(id);
  }
}
