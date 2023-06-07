import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from '../base/base.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      const httpException = exception as HttpException;
      status = httpException.getStatus();
      message = this.getExceptionMessage(httpException);
    }

    const apiResponse: BaseResponse<null> = {
      success: false,
      message,
      data: null,
    };

    response.status(status).json(apiResponse);
  }
  private getExceptionMessage(exception: HttpException): string {
    const message =
      (exception.getResponse() as string | { message: string }) || '';

    if (typeof message === 'string') {
      return message;
    } else if (typeof message === 'object' && 'message' in message) {
      return message.message;
    }

    return 'An error occurred';
  }
}
