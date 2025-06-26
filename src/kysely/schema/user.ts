import {
	ColumnType,
	Generated,
	Insertable,
	JSONColumnType,
	Selectable,
	Updateable,
} from 'kysely';

export interface UserTable {
	id: Generated<number>;
	first_name: string;
	gender: 'man' | 'woman' | 'other';
	last_name: string | null;
	created_at: ColumnType<Date, string | undefined, never>;
	metadata: JSONColumnType<{
		login_at: string;
		ip: string | null;
		agent: string | null;
		plan: 'free' | 'premium';
	}>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
