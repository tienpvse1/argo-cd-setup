import { Injectable } from '@nestjs/common';
import { InjectKysely } from '@third-parties/kysely';
import { KyselyInstance } from 'apps/order/src/database';
import { nanoid } from 'nanoid';
import { OrderItem } from '../../../order-item/domains/order-item.entity';
import { OrderRepository } from '../../applications/ports/order.repository';
import { Order } from '../../domains/entites/order.entity';
import { OrderStatus } from '../../domains/enums/order-status.enum';

@Injectable()
export class OrderRelationalInfrastructure extends OrderRepository {
	constructor(@InjectKysely() private readonly kysely: KyselyInstance) {
		super();
	}

	private validateOrderStatus(status: string): status is OrderStatus {
		return Object.values(OrderStatus).includes(status as OrderStatus);
	}

	async createOrder(input: {
		userId: string;
		items: { productId: string; quantity: number }[];
	}): Promise<Order> {
		const { createdOrder, createdItems } = await this.kysely
			.transaction()
			.execute(async (tx) => {
				const newOrderId = nanoid(6);
				const createdOrder = await tx
					.withSchema('order')
					.insertInto('order')
					.values({
						id: newOrderId,
						userId: input.userId,
						name: 'name',
						email: 'email',
						phone: 'phone',
						address: 'address',
						status: 'open',
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
					})
					.returningAll()
					.executeTakeFirst();

				const createdItems = await Promise.all(
					input.items.map(async (item) => {
						return tx
							.withSchema('order')
							.insertInto('orderItem')
							.values({
								id: nanoid(6),
								orderId: newOrderId,
								productId: item.productId,
								quantity: item.quantity,
								createdAt: new Date().toISOString(),
								updatedAt: new Date().toISOString(),
							})
							.returningAll()
							.executeTakeFirst();
					}),
				);
				return { createdOrder, createdItems };
			});
		if (!createdOrder) throw new Error('Order not created');
		if (!this.validateOrderStatus(createdOrder.status))
			throw new Error('Invalid order status');

		return new Order(
			createdOrder.id,
			createdOrder.userId,
			createdOrder.status,
			createdItems.map((item) => {
				return new OrderItem(
					item?.id ?? '',
					item?.orderId ?? '',
					item?.productId ?? '',
					item?.quantity ?? 0,
					1,
				);
			}),
		);
	}
}
