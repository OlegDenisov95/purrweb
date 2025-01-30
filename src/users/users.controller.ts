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
import { UserDto, UsersService } from './users.service';

interface GetParams {
  user_id: number;
}

interface UpdateParams {
  user_id: number;
}

interface DeleteParams {
  user_id: number;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(201)
  @Post()
  createUser(@Body() requestDto: UserDto) {
    return this.userService.create(requestDto);
  }

  @Get()
  listUsers() {
    return this.userService.findAll();
  }

  @Get(':user_id')
  async readUser(@Param() { user_id }: GetParams) {
    return await this.userService.findOne(user_id);
  }

  @Put(':user_id')
  updateUser(@Param() { user_id }: UpdateParams, @Body() requestDto: UserDto) {
    return this.userService.update(user_id, requestDto);
  }

  @HttpCode(204)
  @Delete(':user_id')
  async deleteUser(@Param() { user_id }: DeleteParams) {
    await this.userService.remove(user_id);
  }
}
