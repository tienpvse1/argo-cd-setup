import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { CreateOrderCommand } from '../../domains/commands/create-order.command';
import { KafkaOrderServiceClient } from '../../domains/constants';
import { Order } from '../../domains/entites/order.entity';
import { OrderRepository } from '../ports/order.repository';

@CommandHandler(CreateOrderCommand)
export class CreateOrderUseCase implements ICommandHandler<CreateOrderCommand> {
	constructor(
		@Inject(KafkaOrderServiceClient)
		private readonly kafkaClient: ClientKafkaProxy,
		private readonly orderRepository: OrderRepository,
	) {}

	async execute(command: CreateOrderCommand): Promise<Order> {
		const order = await this.orderRepository.createOrder({
			userId: command.userId,
			items: command.items.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
			})),
		});
		this.kafkaClient.emit('order.created', JSON.stringify(order));
		return order;
	}
}
