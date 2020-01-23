import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void {
        Logger.log('new request');

        next();
    }

}
