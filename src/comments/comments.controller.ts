import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentDto, CommentService } from './comments.service';

interface CreateParams {
  card_id: number;
}

interface ListParams {
  card_id: number;
}

interface ReadParams {
  card_id: number;
  id: number;
}

interface UpdateParams {
  card_id: number;
  id: number;
}

interface DeleteParams {
  card_id: number;
  id: number;
}

@Controller('users/:user_id/columns/:columns_id/cards/:card_id/comments')
export class CommentController {
  constructor(private readonly cardService: CommentService) {}

  @HttpCode(201)
  @Post()
  create(@Param() {  card_id }: CreateParams, @Body() requestDto: CommentDto) {
    return this.cardService.create(card_id, requestDto);
  }

  @Get()
  list(@Param() { card_id }: ListParams) {
    return this.cardService.findAll(card_id);
  }

  @Get(':id')
  read(@Param() { card_id, id }: ReadParams) {
    return this.cardService.findOne(card_id, id);
  }

  @Put(':id')
  update(
    @Param() { card_id, id }: UpdateParams,
    @Body() requestDto: CommentDto,
  ) {
    return this.cardService.update(card_id, id, requestDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param() { id }: DeleteParams) {
    await this.cardService.remove(id);
  }
}
