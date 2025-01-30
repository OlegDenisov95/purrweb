import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Card } from './cards/card.entity';
import { Column } from './columns/column.entity';
import { Comment } from './comments/comment.entity';
import { ColumnsModule } from './columns/columns.module';
import { ColumnsService } from './columns/columns.service';
import { CardsService } from './cards/cards.service';
import { CardsModule } from './cards/cards.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { CommentService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    ColumnsModule,
    CardsModule,
    CommentsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'admin',
      password: 'password',
      database: 'purrweb',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Comment, Column, Card],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    ColumnsService,
    CardsService,
    CommentService,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
