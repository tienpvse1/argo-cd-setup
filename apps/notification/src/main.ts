import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification-app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
		NotificationModule,
		{
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					transport: Transport.KAFKA,
					options: {
						client: {
							brokers: config.getOrThrow('kafka.hosts'),
							clientId: 'notification-service',
						},
						consumer: {
							groupId: 'notification-consumers',
						},
					},
				};
			},
		},
	);
	await app.listen();
}
bootstrap();
