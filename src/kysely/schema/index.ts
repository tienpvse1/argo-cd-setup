import { PermissionTable } from './permission';
import { RoleTable } from './role';
import { UserTable } from './user';

export * from './user';
export interface Database {
	user: UserTable;
	role: RoleTable;
	permission: PermissionTable;
}
