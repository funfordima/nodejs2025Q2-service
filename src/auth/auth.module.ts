import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { SignOptions } from 'jsonwebtoken';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'secret123123',
      signOptions: { 
        expiresIn: (process.env.TOKEN_EXPIRE_TIME || '1h') as SignOptions['expiresIn'],
      },
    }),
  ],
})
export class AuthModule {}
