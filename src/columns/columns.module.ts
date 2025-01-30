import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { Column } from './column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsController } from './columns.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Column, User])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService, TypeOrmModule],
})
export class ColumnsModule {}
