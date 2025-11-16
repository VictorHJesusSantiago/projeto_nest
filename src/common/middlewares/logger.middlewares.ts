import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
    console.log('Início da req'); 

    res.on('finish', () => {
      console.log(
        `[RESPONSE] ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
      );
    });

    next();
  }
}