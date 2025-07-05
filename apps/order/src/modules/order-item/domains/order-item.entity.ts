import { HasAmount } from 'apps/order/src/interfaces/has-amount';

export class OrderItem implements HasAmount {
	constructor(
		public id: string,
		public userId: string,
		public status: string,
		public quantiy: number,
		public price: number,
	) {}

	getAmount(): number {
		return this.price * this.quantiy;
	}
}
