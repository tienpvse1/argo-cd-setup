import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const UserInfo = createParamDecorator(
	(key: string, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest<Request>();
		if (request.user && key) {
			return request.user[key];
		}
		return request.user;
	},
);
