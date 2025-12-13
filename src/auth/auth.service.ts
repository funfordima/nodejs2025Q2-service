import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { SignOptions } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { Auth, Payload } from './entities/auth.entity';
import { RefreshDto } from './dto/refresh-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: CreateUserDto): Promise<Auth> {
    const user = await this.validateUser(dto);

    return await this.generateToken(user);
  }

  async signup(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const currentUser = await this.userService.findOneByLogin(dto.login);

    if (currentUser) {
      return currentUser;
    }

    const hashPassword = await bcrypt.hash(dto.password, +process.env.CRYPT_SALT || 10);
    
    return await this.userService.create({ ...dto, password: hashPassword });
  }

  private async generateToken(user: User): Promise<Auth> {
    const payload: Payload = { login: user.login, userId: user.id };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
      expiresIn: (process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h')  as SignOptions['expiresIn'],
    });

    return  { 
      accessToken, 
      refreshToken 
    };
  }

  private async validateUser(dto: CreateUserDto): Promise<User> {
    const currentUser = await this.userService.findOneByLogin(dto.login);

    if (!currentUser) {
      throw new ForbiddenException('Incorrect login or password');
    }

    const hasEqualPassword = await bcrypt.compare(dto.password, currentUser.password);

    if (!hasEqualPassword) {
      throw new ForbiddenException('Incorrect login or password');
    }

    return currentUser;
  }

  async refresh({ refreshToken }: RefreshDto): Promise<Auth> {
    if (!refreshToken) {
      throw new UnauthorizedException('UNAUTHORIZED. Incorrect refresh token');
    }

    try {
      const { login } = await this.jwtService.verifyAsync<Payload>(
        refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
        },
      );

      const currentUser = await this.userService.findOneByLogin(login);

      if (!currentUser) {
        throw new ForbiddenException('Incorrect login or password');
      }

      return await this.generateToken(currentUser);
    } catch {
      throw new ForbiddenException('Incorrect refresh token');
    }
  }
}
