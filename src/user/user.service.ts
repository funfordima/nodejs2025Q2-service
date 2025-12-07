import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(): Promise<Omit<User, 'password'>[]> {
    return (
      await this.prismaService.user.findMany({
        select: {
          id: true,
          login: true,
          version: true,
          createdAt: true,
          updatedAt: true,
        },
      })
    ).map((user) => ({
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    }));
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.prismaService.user.findUnique({
      where: { login: data.login },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (existing) {
      return {
        ...existing,
        createdAt: Number(existing.createdAt),
        updatedAt: Number(existing.updatedAt),
      };
    }

    const currentTime = Date.now();

    const user = await this.prismaService.user.create({
      data: {
        login: data.login,
        password: data.password,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    };
  }

  async delete(id: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.prismaService.user.delete({
      where: { id },
    });
  }

  async update(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password != dto.oldPassword) {
      throw new ForbiddenException('Bad request.');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        password: dto.newPassword,
        version: { increment: 1 },
        updatedAt: Date.now(),
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    };
  }
}
