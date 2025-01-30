import { Module } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comments.controller';
import { Card } from 'src/cards/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Comment])],
  providers: [CommentService],
  controllers: [CommentController],
  exports: [CommentService, TypeOrmModule],
})
export class CommentsModule {}
