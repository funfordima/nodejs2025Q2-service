import 'dotenv/config';

import { join } from 'path';
import { existsSync, mkdirSync, createWriteStream } from 'fs';
import { stat, rename, access, constants } from 'fs/promises';

import {
  ConsoleLogger,
  Global,
  Injectable,
  LoggerService,
  Optional,
} from '@nestjs/common';

import { LogLevels } from '../enums/log-level.enum';

@Global()
@Injectable()
export class CustomLoggerService implements LoggerService {
  private allowedLevels: Set<LogLevels> = new Set();

  private readonly logDir = join(process.cwd(), 'logs');
  private readonly logFile = join(this.logDir, 'app.log');
  private readonly maxFileSizeKb = Number(process.env.LOG_FILE_SIZE_KB ?? 100);

  constructor(@Optional() private readonly logger?: ConsoleLogger) {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }

    this.allowedLevels = new Set(
      (process.env.LOG_LEVELS?.split(',') as LogLevels[]) ??
        this.getDefaultLogLevels(),
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

  private async logToFile(
    level: LogLevels,
    message: string,
    context?: string,
    trace?: string,
  ) {
    await this.rotateFile();

    const logEntry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      trace,
    });

    // appendFileSync(this.logFile, logEntry + '\n');

    const writeStream = createWriteStream(this.logFile, { flags: 'a' });

    writeStream.write(logEntry + '\n');
    writeStream.end();
  }

  private async rotateFile(): Promise<void> {
    const isFileExists = await this.checkFileExists(this.logFile);

    if (!isFileExists) {
      return;
    }

    const { size } = await stat(this.logFile);
    const sizeKb = size / 1024;

    if (sizeKb < this.maxFileSizeKb) {
      return;
    }

    const rotatedName = `app-${Date.now()}.log`;
    const rotatedPath = join(this.logDir, rotatedName);

    await rename(this.logFile, rotatedPath);
  }

  private async checkFileExists(filePath: string): Promise<boolean> {
    try {
      await access(filePath, constants.R_OK);

      return true;
    } catch {
      return false;
    }
  }

  async log(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.LOG)) {
      this.logger?.log(message, context) ?? console.log(message);

      await this.logToFile(LogLevels.LOG, message, context);
    }
  }

  async error(message: string, trace?: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.ERROR)) {
      this.logger?.error(message, trace, context) ?? console.error(message);

      await this.logToFile(LogLevels.LOG, message, context, trace);
    }
  }

  async warn(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.WARN)) {
      this.logger?.warn(message, context);

      await this.logToFile(LogLevels.LOG, message, context);
    }
  }

  async debug(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.DEBUG)) {
      this.logger?.debug(message, context);

      await this.logToFile(LogLevels.LOG, message, context);
    }
  }

  async verbose(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.VERBOSE)) {
      this.logger?.verbose(message, context);

      await this.logToFile(LogLevels.LOG, message, context);
    }
  }
}
