// user.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (
    data: unknown,
    ctx: ExecutionContext,
  ): { id: string; email: string; roles: string[] } => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request['user'] as { id: string; email: string; roles: string[] }; // Assuming user details are stored in the request object
  },
);
