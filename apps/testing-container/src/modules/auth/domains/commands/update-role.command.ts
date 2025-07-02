import { Command } from '@nestjs/cqrs';

export class UpdateRoleCommand extends Command<boolean> {
	userId: string;
	role: string;

	constructor(userId: string, role: string) {
		super();
		this.userId = userId;
		this.role = role;
	}
}
