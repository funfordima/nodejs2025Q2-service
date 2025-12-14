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
import { LOG_LEVEL_PRIORITY } from '../constants/logging.constants';

@Global()
@Injectable()
export class CustomLoggerService implements LoggerService {
  private readonly allowedLevels: Set<string>;

  private readonly logDir = join(process.cwd(), 'logs');
  private readonly logFile = join(this.logDir, 'app.log');
  private readonly maxFileSizeKb = Number(process.env.LOG_FILE_SIZE_KB ?? 100);

  constructor(@Optional() private readonly logger?: ConsoleLogger) {
    if (!existsSync(this.logDir)) {
      mkdirSync(this.logDir, { recursive: true });
    }

    const envLevel = process.env.LOG_LEVEL ?? 'log';

    const maxPriority =
      LOG_LEVEL_PRIORITY[envLevel] ?? LOG_LEVEL_PRIORITY.log;

    this.allowedLevels = new Set(
      Object.entries(LOG_LEVEL_PRIORITY)
        .filter(([, priority]) => priority <= maxPriority)
        .map(([level]) => level),
    );

    console.log(this.allowedLevels);
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

      await this.logToFile(LogLevels.ERROR, message, context, trace);
    }
  }

  async warn(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.WARN)) {
      this.logger?.warn(message, context);

      await this.logToFile(LogLevels.WARN, message, context);
    }
  }

  async debug(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.DEBUG)) {
      this.logger?.debug(message, context);

      await this.logToFile(LogLevels.DEBUG, message, context);
    }
  }

  async verbose(message: string, context?: string) {
    if (this.allowedLevels.has(LogLevels.VERBOSE)) {
      this.logger?.verbose(message, context);

      await this.logToFile(LogLevels.VERBOSE, message, context);
    }
  }
}
