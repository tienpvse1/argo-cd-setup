import { AppAbility } from '../auth/permission/permission';

type HasAbility = {
	ability?: AppAbility;
};

declare global {
	declare namespace Express {
		interface User extends HasAbility {
			userId: string;
			email: string;
			role: string;
			isAdmin?: boolean;
		}
	}
}
