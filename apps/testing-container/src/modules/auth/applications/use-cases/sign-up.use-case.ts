import { SignupCommand } from '@modules/auth/domains/commands/register.command';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { UserSignedUpEvent } from '@modules/auth/domains/events/user-signed-up.event';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AuthOutboundPort } from '../ports/auth.outbound-port';

@CommandHandler(SignupCommand)
export class SignUpHandler implements ICommandHandler<SignupCommand> {
	constructor(
		private readonly authInfrastructure: AuthOutboundPort,
		private readonly eventBus: EventBus,
	) {}

	async execute(command: SignupCommand): Promise<AuthEntity> {
		const authResponse = await this.authInfrastructure.register(command);

		this.eventBus.publish(new UserSignedUpEvent(authResponse.user.id));

		return authResponse;
	}
}
