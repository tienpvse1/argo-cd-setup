import { HasAmount } from 'apps/order/src/interfaces/has-amount';
import { OrderStatus } from '../enums/order-status.enum';

export class Order implements HasAmount {
	constructor(
		public id: string,
		public userId: string,
		public status: OrderStatus,
		public items: HasAmount[],
	) {}

	getAmount(): number {
		return this.items.reduce((total, item) => total + item.getAmount(), 0);
	}
}
