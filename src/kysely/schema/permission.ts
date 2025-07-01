import { ColumnType, Generated } from 'kysely';

export type PermissionTable = {
	id: Generated<number>;
	can: string;
	subject: string;
	roleId: number;
	createdAt: ColumnType<Date, string | undefined, never>;
	updatedAt: ColumnType<Date, string | undefined, never>;
	isActive: boolean;
};
