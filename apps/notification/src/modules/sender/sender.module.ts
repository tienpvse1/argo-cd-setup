import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendNotificationHandler } from './applications/use-cases/send-notification.use-case';
import { NotificationInfrastructureModule } from './infrastructures/notification-infrastructure.module';
import { NotificationHandler } from './presenters/kafka/sender.handler';

@Module({
	providers: [SendNotificationHandler],
	controllers: [NotificationHandler],
	imports: [
		HttpModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					baseURL: config.get('services.user.host'),
				};
			},
		}),

		NotificationInfrastructureModule.register('email'),
	],
})
export class SenderModule {}
