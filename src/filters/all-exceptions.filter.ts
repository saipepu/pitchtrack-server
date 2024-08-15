import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  
  @Catch(HttpException)
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
      const exceptionResponse = exception.getResponse();
  
      const errorResponse =
        typeof exceptionResponse === 'string'
          ? { message: exceptionResponse }
          : (exceptionResponse as any);
  
      response.status(status).json({
        success: false,
        message:  errorResponse.message || 'Internal server error',
      });
    }
  }
  