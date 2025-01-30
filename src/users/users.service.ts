import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';


export class UserDto {
  @IsString()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ email, password }: UserDto): Promise<User> {
    const user = this.usersRepository.create();
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException();
    }

    return user;
  }
  
  findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id, { email, password }: UserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException();
    }

    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    return this.usersRepository.save(user);
  }

  remove(id: number): Promise<any> {
    return this.usersRepository.delete(id);
  }
}
