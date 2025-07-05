import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentGatewayModule } from './payment-gateway-app.module';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		PaymentGatewayModule,
		{
			transport: Transport.KAFKA,
			options: {
				client: {
					brokers: ['localhost:9092'],
					clientId: 'payment-service',
				},
				consumer: {
					groupId: 'payment-consumers',
				},
			},
		},
	);
	await app.listen();
}
bootstrap();
