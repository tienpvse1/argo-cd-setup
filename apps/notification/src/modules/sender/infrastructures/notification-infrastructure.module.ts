import { DynamicModule, Module, Type } from '@nestjs/common';
import { EmailStrategy } from './strategies/email/email.strategy';
import { EmailPayload } from './strategies/email/email-receipient.adapter';
import { Notifier } from './strategies/notifier';
import { NotificationPayload } from './strategies/receipient';

export type Strategies = 'email';
@Module({})
export class NotificationInfrastructureModule {
	static register(strategies: Strategies): DynamicModule {
		const availableStrategies: Record<
			Strategies,
			{ payloadAdapter: Type<NotificationPayload>; notifier: Type<Notifier> }
		> = {
			email: {
				payloadAdapter: EmailPayload,
				notifier: EmailStrategy,
			},
		};
		return {
			module: NotificationInfrastructureModule,
			providers: [
				{
					provide: NotificationPayload,
					useClass: availableStrategies[strategies].payloadAdapter,
				},
				{
					provide: Notifier,
					useClass: availableStrategies[strategies].notifier,
				},
			],
			exports: [Notifier],
		};
	}
}
