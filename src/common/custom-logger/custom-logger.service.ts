import path from 'path';
import fs from 'fs';

import { ConsoleLogger, Global, Injectable, LoggerService, Optional } from '@nestjs/common';

import { LogLevels } from '../constants/log-level.enum';

@Global()
@Injectable()
export class CustomLoggerService implements LoggerService {
  private allowedLevels: Set<LogLevels> = new Set();

  constructor(
    @Optional() private readonly logger?: ConsoleLogger,
  ) {
    const logDir = path.join(process.cwd(), 'logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    this.allowedLevels = new Set(
      (process.env.LOG_LEVELS?.split(',') as LogLevels[]) ?? this.getDefaultLogLevels(),
    );
  }

  private getDefaultLogLevels(): LogLevels[] {
    return process.env.NODE_ENV === 'production'
      ? [LogLevels.ERROR, LogLevels.WARN, LogLevels.LOG]
      : [
          LogLevels.ERROR,
          LogLevels.WARN,
          LogLevels.LOG,
          LogLevels.DEBUG,
          LogLevels.VERBOSE,
        ];
  }

  log(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.LOG)) {
      this.logger?.log(message, context) ?? console.log(message);
    }
  }

  error(message: string, trace?: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.ERROR)) {
      this.logger?.error(message, trace, context) ?? console.error(message);
    }
  }

  warn(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.WARN)) {
      this.logger?.warn(message, context);
    }
  }

  debug(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.DEBUG)) {
      this.logger?.debug(message, context);
    }
  }

  verbose(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.VERBOSE)) {
      this.logger?.verbose(message, context);
    }
  }
}
