import { Logger } from '@nestjs/common';
import { Payload, Sender } from '../applications/ports/sender';
import { NotificationProvider } from '../domains/enums/providers.enum';

export class EmailSender implements Sender {
	async sendNotification(payload: Payload): Promise<boolean> {
		const message = await payload.getMessage(NotificationProvider.Email);
		Logger.debug(message);
		return true;
	}
}
