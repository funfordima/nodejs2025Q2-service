import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomLoggerService } from './custom-logger/custom-logger.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: CustomLoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = 'Internal server error';

    if (typeof response === 'string') {
      message = response;
    } else if (typeof response === 'object' && 'message' in response) {
      message = Array.isArray(response.message)
        ? response.message.join(', ')
        : `${response.message}`;
    }

    if (status >= 500) {
      this.loggerService.error(
        `[${request.method}] ${request.url}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else {
      this.loggerService.warn(
        `[${request.method}] ${request.url} → ${status} ${message}`,
      );
    }

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.name,
        message,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
  }
}
