import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof HttpException && exception.getStatus() !== 500) {
      // Suppress full trace
      const { name, message } = exception;
      console.error('Exception thrown', name, message);
    } else {
      console.error('Exception thrown', exception, host);
    }

    super.catch(exception, host);
  }
}
