import { LoginCommand } from '@modules/auth/domains/commands/login.command';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthOutboundPort } from '../ports/auth.outbound-port';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
	constructor(private readonly authInfrastructure: AuthOutboundPort) {}
	execute(command: LoginCommand): Promise<AuthEntity> {
		return this.authInfrastructure.login(command);
	}
}
