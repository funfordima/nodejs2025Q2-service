import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-password.dto';

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
        createdAt: new Date(user.createdAt).getTime(),
        updatedAt: new Date(user.updatedAt).getTime(),
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
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = await this.prismaService.user.findUnique({
      where: { login: data.login },
    });

    if (existing) {
      throw new BadRequestException('User already exists.');
    }

    const user = await this.prismaService.user.create({
      data : { 
        login: data.login,
        password: data.password,
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
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
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
    dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (user.password == dto.password) {
      throw new ForbiddenException('Bad request.');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data : { 
        password: dto.password,
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
      createdAt: new Date(updatedUser.createdAt).getTime(),
      updatedAt: new Date(updatedUser.updatedAt).getTime(),
    };
  }
}
