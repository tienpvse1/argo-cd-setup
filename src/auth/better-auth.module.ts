import { DynamicModule, Module, Provider } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { openAPI } from 'better-auth/plugins';
import { BetterAuthModuleTemplate } from './better-auth.module-definition';

export const BetterAuthToken = Symbol();

@Module({})
export class BetterAuthModule extends BetterAuthModuleTemplate.ConfigurableModuleClass {
	static initAuth(config: typeof BetterAuthModuleTemplate.OPTIONS_TYPE) {
		const auth = betterAuth({
			plugins: [openAPI({ path: '/docs' })],
			database: {
				db: config.database,
				type: 'postgres',
			},
			emailAndPassword: {
				enabled: true,
			},
		});
		return auth;
	}

	static override register(
		options: typeof BetterAuthModuleTemplate.OPTIONS_TYPE,
	): DynamicModule {
		const originModule = super.register(options);
		const originProviders = originModule.providers ?? [];
		const originExports = originModule.exports ?? [];
		const authInstance = BetterAuthModule.initAuth(options);

		const authProvider = {
			provide: BetterAuthToken,
			useValue: authInstance,
		};

		return {
			...originModule,
			providers: [...originProviders, authProvider],
			exports: [...originExports, authProvider],
		};
	}

	static override registerAsync(
		asyncOptions: typeof BetterAuthModuleTemplate.ASYNC_OPTIONS_TYPE,
	): DynamicModule {
		const originModule = super.registerAsync(asyncOptions);
		const originProviders = originModule.providers ?? [];
		const originExports = originModule.exports ?? [];

		const authProvider: Provider = {
			provide: BetterAuthToken,
			inject: [BetterAuthModuleTemplate.MODULE_OPTIONS_TOKEN],
			useFactory(options: typeof BetterAuthModuleTemplate.OPTIONS_TYPE) {
				const authInstance = BetterAuthModule.initAuth(options);
				return authInstance;
			},
		};

		return {
			...originModule,
			providers: [...originProviders, authProvider],
			exports: [...originExports, authProvider],
			global: true,
		};
	}
}
