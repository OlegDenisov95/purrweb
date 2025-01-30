import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from './column.entity';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { User } from 'src/users/user.entity';
import { plainToInstance } from 'class-transformer';

export class ColumnDto {
  @IsString()
  @MaxLength(255)
  content: string;
}


@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Column)
    private columnRepository: Repository<Column>,
  ) {}

  async create(userId: number, { content }: ColumnDto): Promise<Column> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException();
    }

    const column = this.columnRepository.create();
    column.content = content;
    column.user = user;
    
    return plainToInstance(Column,this.columnRepository.save(column));
  }

  async findAll(userId: number): Promise<Column[]> {
    return this.columnRepository.findBy({ user: { id: userId } });
  }

  async findOne(userId: number, id: number): Promise<Column | null> {
    return this.columnRepository.findOneBy({ user: { id: userId }, id });
  }

  async update(
    userId: number,
    id: number,
    { content }: ColumnDto,
  ): Promise<Column> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (user === null) {
      throw new NotFoundException();
    }

    const column = await this.columnRepository.findOneBy({ id });
    if (column === null) {
      throw new NotFoundException();
    }

    column.content = content;
    column.user = user;
    return plainToInstance(Column,this.columnRepository.save(column));
  }

  remove(id: number): Promise<any> {
    return this.columnRepository.delete(id);
  }
}
