import { HttpException } from '@nestjs/common';

export class UserExists extends HttpException {
	constructor() {
		super(
			{
				message: 'User existed',
				severity: 'error',
			},
			400,
		);
	}
}
