import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsController } from './cards.controller';
import { Column } from 'src/columns/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Column])],
  providers: [CardsService],
  controllers: [CardsController],
  exports: [CardsService, TypeOrmModule],
})
export class CardsModule {}
