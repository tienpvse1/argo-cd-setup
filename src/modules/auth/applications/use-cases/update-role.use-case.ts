import { UpdateRoleCommand } from '@modules/auth/domains/commands/update-role.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthOutboundPort } from '../ports/auth.outbound-port';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand> {
	constructor(private readonly authInfrastructure: AuthOutboundPort) {}
	execute(command: UpdateRoleCommand): Promise<boolean> {
		return this.authInfrastructure.updateRole(command.userId, command.role);
	}
}
