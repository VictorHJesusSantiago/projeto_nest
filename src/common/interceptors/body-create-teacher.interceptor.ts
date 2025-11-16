import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BodyCreateTeacherInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (body && body.name && typeof body.name === 'string') {
        const formattedName = body.name
        .split(' ') 
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
        .join(' '); 
      request.body.name = formattedName;
      console.log(`[BodyCreateTeacherInterceptor] Nome modificado para: ${formattedName}`);
    }

    return next.handle();
  }
}