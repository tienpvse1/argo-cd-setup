import { ColumnType } from 'kysely';

export type Order = {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	status: string;
	userId: string;
	createdAt: ColumnType<Date, string, never>;
	updatedAt: ColumnType<Date, string, string>;
	deletedAt?: ColumnType<Date | null, string, string>;
};
