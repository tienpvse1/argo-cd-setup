import { SetMetadata } from '@nestjs/common';
import { Permission } from './permission';

export const PolicyKey = Symbol();
export type PolicyArgs = {
	permissions: Permission[];
	/**
	 * @default false
	 * @description if true, all permissions will be required
	 * */
	requireAll?: boolean;
};

export function Policy({ permissions, requireAll }: PolicyArgs) {
	return SetMetadata(PolicyKey, {
		permissions,
		requireAll,
	});
}
