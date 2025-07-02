import { Command } from '@nestjs/cqrs';
import { AuthEntity } from '../entities/auth.entity';

export class LoginCommand extends Command<AuthEntity> {
	email: string;
	password: string;

	constructor(email: string, password: string) {
		super();
		this.email = email;
		this.password = password;
	}
}
