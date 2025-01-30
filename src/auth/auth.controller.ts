import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { AuthDto, AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @SetMetadata('isPublic', true)
  @Post('login')
  signIn(@Body() signInDto: AuthDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
