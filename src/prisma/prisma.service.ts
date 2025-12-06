import 'dotenv/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({ connectionString });

    super({
      adapter,
      log: ['error', 'warn'],
    });
  }

  async onModuleInit(): Promise<void> {
    await super.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await super.$disconnect();
  }
}
