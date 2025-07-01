import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
	ASYNC_OPTIONS_TYPE,
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
} from './permission.module-definition';

export type PermissionFromDB = {
	name: string;
	can: string | null;
	subject: string | null;
};
export const PermissionsInjectToken = Symbol();

@Module({})
export class PermissionModule extends ConfigurableModuleClass {
	static register(config: typeof OPTIONS_TYPE) {
		return super.register(config);
	}

	static registerAsync(config: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
		const original = super.registerAsync(config);
		const originalProviders = original.providers ?? [];
		const originalExports = original.exports ?? [];
		const permissionProvider: Provider = {
			provide: PermissionsInjectToken,
			inject: [MODULE_OPTIONS_TOKEN],
			async useFactory({ kysely }: typeof OPTIONS_TYPE) {
				const permissions = await kysely
					.selectFrom('role')
					.leftJoin('permission', 'role.id', 'permission.roleId')
					.where('role.isActive', '=', true)
					.where('permission.isActive', '=', true)
					.select(['role.name', 'permission.can', 'permission.subject'])
					.execute();
				return permissions;
			},
		};
		return {
			...original,
			providers: [...originalProviders, permissionProvider],
			exports: [...originalExports, PermissionsInjectToken],
			global: true,
		};
	}
}
