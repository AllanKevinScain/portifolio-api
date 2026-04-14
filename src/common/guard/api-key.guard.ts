import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PROTECTED_KEY } from '../decorators/protected.decorator';

import { type Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isProtected = this.reflector.get<boolean>(
      IS_PROTECTED_KEY,
      context.getHandler(),
    );

    if (!isProtected) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    console.log('🚀 ~ ApiKeyGuard ~ canActivate ~ apiKey:', apiKey);

    if (!apiKey || apiKey !== process.env.API_KEY) {
      throw new UnauthorizedException('API Key inválida');
    }

    return true;
  }
}
