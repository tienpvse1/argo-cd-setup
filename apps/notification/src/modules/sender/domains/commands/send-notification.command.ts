import { Command } from '@nestjs/cqrs';
import { NotificationProvider } from '../enums/providers.enum';

/**
 * returns true if the notification was sent successfully
 */
export class SendNotificationCommand extends Command<boolean> {
	constructor(
		public userId: string,
		public message: string,
		/**
		 * default to `[NotificationProvider.Email]`
		 * */
		public providers = [NotificationProvider.Email],
	) {
		super();
	}
}
