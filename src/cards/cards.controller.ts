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
import { CardDto, CardsService } from './cards.service';

interface CreateParams {
  column_id: number;
}

interface ListParams {
  column_id: number;
}

interface ReadParams {
  column_id: number;
  id: number;
}

interface UpdateParams {
  column_id: number;
  id: number;
}

interface DeleteParams {
  column_id: number;
  id: number;
}

@Controller('users/:user_id/columns/:column_id/cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @HttpCode(201)
  @Post()
  create(@Param() {  column_id }: CreateParams, @Body() requestDto: CardDto) {
    return this.cardService.create(column_id, requestDto);
  }

  @Get()
  list(@Param() { column_id }: ListParams) {
    return this.cardService.findAll(column_id);
  }

  @Get(':id')
  read(@Param() { column_id, id }: ReadParams) {
    return this.cardService.findOne(column_id, id);
  }

  @Put(':id')
  update(
    @Param() { column_id, id }: UpdateParams,
    @Body() requestDto: CardDto,
  ) {
    return this.cardService.update(column_id, id, requestDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param() { id }: DeleteParams) {
    await this.cardService.remove(id);
  }
}
