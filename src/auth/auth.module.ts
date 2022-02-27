import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({}),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Reflector],
  exports: [AuthService],
})
export class AuthModule {}
