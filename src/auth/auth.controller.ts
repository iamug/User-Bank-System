import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { Get, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../shared/decorators/request/public-request.decorator';
import { AuthService } from './auth.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiResponse({ type: AuthResponseDto })
  @Public()
  @Post('register')
  async register(@Body() body: RegisterDto): Promise<AuthResponseDto> {
    try {
      const user = await this.authService.register(body);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @ApiBearerAuth()
  @ApiResponse({ type: AuthResponseDto })
  @Public()
  @Post('login')
  async login(@Body() body: LoginDto): Promise<AuthResponseDto> {
    try {
      const user = await this.authService.signin(body);
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
