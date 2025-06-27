import { Injectable } from '@nestjs/common';
import { LoginCommand } from '../domains/commands/login.command';
import { SignupCommand } from '../domains/commands/register.command';
import { AuthEntity } from '../domains/entities/auth.entity';
import { AuthOutboundPort } from './ports/auth.outbound-port';

@Injectable()
export class AuthService {
	constructor(private readonly authPort: AuthOutboundPort) {}

	async login(input: LoginCommand): Promise<AuthEntity> {
		return this.authPort.login(input);
	}

	async register(input: SignupCommand): Promise<AuthEntity> {
		return this.authPort.register(input);
	}
}
