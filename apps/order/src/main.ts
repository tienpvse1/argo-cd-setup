import { initializeOtel } from '@app/tracing';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { setupDocs } from '@third-parties/api-docs';
import { OrderAppModule } from './order-app.module';

async function bootstrap() {
	const otel = initializeOtel({
		serviceName: 'order_service',
		version: '1.0.0',
	});
	otel.start();
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
	const port = process.env.port ?? 3000;
	await app.listen(port, () => {
		Logger.debug(`App listening at ${port}`);
	});
}
bootstrap();
