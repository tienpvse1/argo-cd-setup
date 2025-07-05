import { UserInfo } from '@internal';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../domains/commands/create-order.command';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller()
export class OrderController {
	constructor(private readonly commandBus: CommandBus) {}

	@Post()
	async createOrder(
		@Body() dto: CreateOrderDto,
		@UserInfo() user: { id: string },
	) {
		const order = await this.commandBus.execute(
			new CreateOrderCommand(user.id, dto.items),
		);
		return order;
	}
}
