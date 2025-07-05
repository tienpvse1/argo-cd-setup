import { ColumnType } from 'kysely';

export type OrderItem = {
	id: string;
	orderId: string;
	productId: string;
	quantity: number;
	createdAt: ColumnType<Date, string, never>;
	updatedAt: ColumnType<Date, string, string>;
	deletedAt?: ColumnType<Date | null, string, string>;
};
