import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private getTokenExpires() {
    return 12 * 60 * 60;
  }

  async getToken(userId: string): Promise<string> {
    const payload = { id: userId };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWTSECRETKEY || 'secret',
      expiresIn: this.getTokenExpires(),
    });
    return accessToken;
  }

  async register(data: RegisterDto): Promise<AuthResponseDto> {
    const emailExists = await this.usersService.findOneByEmail(data.email);
    if (emailExists) throw new BadRequestException('User Already Exists');
    const user = await this.usersService.create(data);
    const token = await this.getToken(user.userId);
    return { token, user };
  }

  async signin(data: LoginDto): Promise<AuthResponseDto> {
    const { email } = data;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new ForbiddenException('Invalid Credentials');
    const token = await this.getToken(user.userId);
    return { token, user };
  }
}
