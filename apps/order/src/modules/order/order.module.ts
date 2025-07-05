import { JwtAuthGuard, JwtStrategy } from '@internal';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderUseCases } from './applications/use-cases';
import { KafkaOrderServiceClient } from './domains/constants';
import { OrderInfrastructureModule } from './infrastructures/order-infrastructure.module';
import { OrderController } from './presenters/http/order.controller';

@Module({
	imports: [
		OrderInfrastructureModule,
		ClientsModule.register([
			{
				name: KafkaOrderServiceClient,
				transport: Transport.KAFKA,
				options: {
					client: {
						clientId: 'order-service',
						brokers: ['localhost:19092'],
					},
					consumer: {
						groupId: 'order-event-consumer',
					},
				},
			},
		]),
	],
	controllers: [OrderController],
	providers: [
		JwtStrategy,
		...OrderUseCases,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class OrderModule {}
