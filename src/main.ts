import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { CustomLoggerService } from './common/custom-logger/custom-logger.service';
import { HttpExceptionFilter } from './common/http-exception.filter';

const PORT: number = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(CustomLoggerService);

  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('Nestjs REST API')
    .setDescription('Home Library Service')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        name: 'Authorization',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err.stack, 'Bootstrap');

    process.exit(1);
  });

  process.on('unhandledRejection', (reason) => {
    const errorMessage =
      reason instanceof Error ? reason.stack : reason.toString();

    logger.error('Unhandled Rejection:', errorMessage, 'Bootstrap');
  });

  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');

    next();
  });

  await app.listen(PORT);

  logger.debug(
    `This application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );
}
bootstrap();
