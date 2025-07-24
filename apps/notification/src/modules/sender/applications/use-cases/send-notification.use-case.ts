import { HttpService } from '@nestjs/axios';
import { HttpStatus, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserInfo } from 'apps/notification/src/types/user-info';
import { lastValueFrom } from 'rxjs';
import { SendNotificationCommand } from '../../domains/commands/send-notification.command';
import { Notifier } from '../../infrastructures/strategies/notifier';

@CommandHandler(SendNotificationCommand)
export class SendNotificationHandler
	implements ICommandHandler<SendNotificationCommand>
{
	constructor(
		private readonly sender: Notifier,
		private http: HttpService,
	) {}

	async execute(command: SendNotificationCommand): Promise<boolean> {
		const userInfoResponse = await this.getUserInfo(command.userId);
		if (userInfoResponse.status !== HttpStatus.OK) {
			Logger.error(`User ${command.userId} not found`);
			return false;
		}
		const result = await this.sender.send({
			email: userInfoResponse.data.email,
			message: command.message,
		});
		return result;
	}

	private getUserInfo(userId: string) {
		return lastValueFrom(this.http.get<UserInfo>(`/users/${userId}`).pipe());
	}
}
