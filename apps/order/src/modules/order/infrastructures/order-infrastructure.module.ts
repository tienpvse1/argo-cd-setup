import { Module } from '@nestjs/common';
import { OrderRepository } from '../applications/ports/order.repository';
import { OrderRelationalInfrastructure } from './relational/order.infrastructure';

@Module({
	providers: [
		{
			provide: OrderRepository,
			useClass: OrderRelationalInfrastructure,
		},
	],
	exports: [OrderRepository],
})
export class OrderInfrastructureModule {}
