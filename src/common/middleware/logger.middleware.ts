import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { CustomLoggerService } from '../custom-logger/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      const message = `${method} ${baseUrl} Status: ${statusCode} Body: ${JSON.stringify(body)} Query: ${JSON.stringify(query)} Duration: ${duration}ms`;

      if (statusCode >= 500) {
        this.loggerService.error(message, undefined, 'HTTP');
      } else if (duration > 1000) {
        this.loggerService.warn(message, 'HTTP');
      } else {
        this.loggerService.log(message, 'HTTP');
      }
    });

    next();
  }
}
