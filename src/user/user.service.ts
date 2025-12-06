import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entity/user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  
  async findMany(): Promise<Omit<User, 'password'>[]> {
    return (await this.prismaService.user.findMany({
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    })).map(user => ({
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
    const currentTime = Date.now();

    const user = await this.prismaService.user.create({
      data : { 
        login: data.login,
        password: data.password,
        updatedAt: currentTime,
        createdAt: currentTime,
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
    data: UpdatePasswordDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password !== data.oldPassword) {
      throw new ForbiddenException('Bad request.');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data : { 
        password: data.newPassword, 
        updatedAt: Date.now(),
        version: { increment: 1 },
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
