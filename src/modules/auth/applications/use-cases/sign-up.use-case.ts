import { SignupCommand } from '@modules/auth/domains/commands/register.command';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthOutboundPort } from '../ports/auth.outbound-port';

@CommandHandler(SignupCommand)
export class SignUpHandler implements ICommandHandler<SignupCommand> {
	constructor(private readonly authInfrastructure: AuthOutboundPort) {}

	execute(command: SignupCommand): Promise<AuthEntity> {
		return this.authInfrastructure.register(command);
	}
}
