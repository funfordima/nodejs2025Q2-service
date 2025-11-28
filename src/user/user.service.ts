import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { users } from '../database/db';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserResponseDto } from './entity/user.entity';

@Injectable()
export class UserService {
  findMany(): UserResponseDto[] {
    return users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  findOne(id: string): UserResponseDto {
    const user: User = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { id: userId, login, version, createdAt, updatedAt } = user;

    return { id: userId, login, version, createdAt, updatedAt };
  }

  create({ login, password }: CreateUserDto): UserResponseDto {
    const user: User = {
      id: randomUUID(),
      login,
      password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    users.push(user);

    const {
      id: userId,
      login: userLogin,
      version,
      createdAt,
      updatedAt,
    } = user;

    return { id: userId, login: userLogin, version, createdAt, updatedAt };
  }

  delete(id: string): number {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found.');
    }

    users.splice(index, 1);

    return index;
  }

  update(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ): UserResponseDto {
    const user: User = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Bad request.');
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version = user.version + 1;

    const { id: userId, login, version, createdAt, updatedAt } = user;

    return { id: userId, login, version, createdAt, updatedAt };
  }
}
