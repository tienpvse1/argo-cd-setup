import { Command } from '@nestjs/cqrs';
import { Order } from '../entites/order.entity';

export class CreateOrderCommand extends Command<Order> {
	constructor(
		public userId: string,
		public items: {
			quantity: number;
			productId: string;
		}[],
	) {
		super();
	}
}
