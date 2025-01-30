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
import { ColumnDto, ColumnsService } from './columns.service';

interface CreateParams {
  user_id: number;
}

interface ListParams {
  user_id: number;
}

interface ReadParams {
  user_id: number;
  id: number;
}

interface UpdateParams {
  user_id: number;
  id: number;
}

interface DeleteParams {
  user_id: number;
  id: number;
}

@Controller('users/:user_id/columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @HttpCode(201)
  @Post()
  create(@Param() { user_id }: CreateParams, @Body() requestDto: ColumnDto) {
    return this.columnService.create(user_id, requestDto);
  }

  @Get()
  list(@Param() { user_id }: ListParams) {
    return this.columnService.findAll(user_id);
  }

  @Get(':id')
  read(@Param() { user_id, id }: ReadParams) {
    return this.columnService.findOne(user_id, id);
  }

  @Put(':id')
  update(
    @Param() { user_id, id }: UpdateParams,
    @Body() requestDto: ColumnDto,
  ) {
    return this.columnService.update(user_id, id, requestDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param() { id }: DeleteParams) {
    await this.columnService.remove(id);
  }
}
