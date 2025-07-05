import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationModule } from './notification-app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		NotificationModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['localhost:9092'],
					clientId: 'notification-service',
				},
				consumer: {
					groupId: 'notification-consumers',
				},
			},
		},
	);
	await app.listen();
}
bootstrap();
