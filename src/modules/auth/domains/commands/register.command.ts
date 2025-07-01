import { Command } from '@nestjs/cqrs';
import { AuthEntity } from '../entities/auth.entity';

export class SignupCommand extends Command<AuthEntity> {
	name: string;
	email: string;
	password: string;

	constructor(name: string, email: string, password: string) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
