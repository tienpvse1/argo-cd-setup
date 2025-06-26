import { UserTable } from './user';

export * from './user';
export interface Database {
	user: UserTable;
}
