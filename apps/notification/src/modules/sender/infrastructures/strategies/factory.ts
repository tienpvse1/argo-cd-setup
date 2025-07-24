import { Notifier } from './notifier';

export abstract class NotificationProviderFactory {
	static create(): Notifier {
		return {
			send() {
				throw new Error('not implemented');
			},
		};
	}
}
