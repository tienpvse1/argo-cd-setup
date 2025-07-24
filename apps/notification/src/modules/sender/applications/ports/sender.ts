import { NotificationProvider } from '../../domains/enums/providers.enum';

export interface Payload {
	userId: string;
	getMessage(provider: NotificationProvider): Promise<string>;
}

export abstract class Sender {
	abstract sendNotification(payload: Payload): Promise<boolean>;
}
