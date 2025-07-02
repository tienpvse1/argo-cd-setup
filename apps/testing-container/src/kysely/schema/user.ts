import {
	ColumnType,
	Generated,
	Insertable,
	JSONColumnType,
	Selectable,
	Updateable,
} from 'kysely';

export interface UserTable {
	id: Generated<string>;
	firstName: string;
	gender: 'man' | 'woman' | 'other';
	lastName: string | null;
	createdAt: ColumnType<Date, string | undefined, never>;
	metadata: JSONColumnType<{
		loginAt: string;
		ip: string | null;
		agent: string | null;
		plan: 'free' | 'premium';
	}>;
	updatedAt: ColumnType<Date, string | undefined, never>;
	banned?: boolean;
	banReason?: string;
	role?: string;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
