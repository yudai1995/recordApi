/* eslint-disable indent */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Error } from 'mongoose';

@Catch(Error)
export class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        switch (exception.name) {
            // Mongoose の検証エラーが発生したら HTTP BadRequest エラーを返却する
            case Error.ValidationError.name:
            case Error.CastError.name:
                response.status(HttpStatus.BAD_REQUEST).json(null);
                break;
            // Mongoose でデータが見つからなかった時に HTTP NotFound エラーを返却する
            case Error.DocumentNotFoundError.name:
                response.status(HttpStatus.NOT_FOUND).json(null);
                break;
        }
    }
}
