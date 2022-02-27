import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { table } from 'console';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  private readonly Users = () => this.knex<User>('users');

  async create(data: CreateUserDto) {
    const user = await this.Users().insert(data);
    const userData = await this.Users().where('id', user[0]).first();
    return userData;
  }

  async findOneByEmail(email: string) {
    return await this.Users().where('email', email).first();
  }

  async update(userId: string, data: Partial<User>) {
    const user = await this.Users().where('userId', userId).first();
    if (!user) throw new NotFoundException('user Does Not Exist');
    const updatedUser = await this.Users().update(data).where('userId', userId);
    return { ...user, ...data };
  }
}
