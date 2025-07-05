import { Order } from '../../domains/entites/order.entity';

type CreateOrderInput = {
	userId: string;
	items: {
		productId: string;
		quantity: number;
	}[];
};

export abstract class OrderRepository {
	abstract createOrder(input: CreateOrderInput): Promise<Order>;
}
