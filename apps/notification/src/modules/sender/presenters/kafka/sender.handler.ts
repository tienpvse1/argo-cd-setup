import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SendNotificationCommand } from '../../domains/commands/send-notification.command';

@Controller()
export class NotificationHandler {
	constructor(private readonly commandBus: CommandBus) {}
	@MessagePattern('order.created')
	handleOrderCreated(@Payload() data: { id: string; userId: string }) {
		return this.commandBus.execute(
			new SendNotificationCommand(data.userId, `Order ${data.id} created`),
		);
	}
}
