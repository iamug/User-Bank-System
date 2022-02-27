import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class AuthUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isEnabled: boolean | number;

  @ApiProperty()
  createdAt: Date | string;

  @ApiProperty()
  updatedAt: Date | string;
}

export class AuthResponseDto {
  @ApiProperty()
  token: string;

  @ApiProperty({ type: AuthUserDto })
  user: AuthUserDto;
}
