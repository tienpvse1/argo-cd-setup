import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { setupDocs } from '@third-parties/api-docs';
import { OrderAppModule } from './order-app.module';

async function bootstrap() {
	const app = await NestFactory.create(OrderAppModule);
	setupDocs(app);
	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
			client: {
				clientId: 'order-service',
				brokers: ['localhost:19092'],
			},
			consumer: {
				groupId: 'order-consumers',
			},
		},
	});
	await app.listen(process.env.port ?? 3000);
}
bootstrap();
