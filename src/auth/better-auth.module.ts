import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { bearer, jwt, openAPI } from 'better-auth/plugins';
import { BetterAuthModuleTemplate } from './better-auth.module-definition';

export const BetterAuthToken = Symbol();

export type BetterAuthInstance = ReturnType<typeof BetterAuthModule.initAuth>;

export function InjectBetterAuth() {
	return Inject(BetterAuthToken);
}

@Module({})
export class BetterAuthModule extends BetterAuthModuleTemplate.ConfigurableModuleClass {
	static initAuth(config: typeof BetterAuthModuleTemplate.OPTIONS_TYPE) {
		const auth = betterAuth({
			user: {
				additionalFields: {
					metadata: {
						type: 'string',
					},
				},
			},

			plugins: [
				bearer(),
				openAPI({ path: '/docs' }),
				jwt({
					jwt: {
						definePayload: ({ user }) => {
							return {
								id: user.id,
								email: user.email,
								role: user.role,
								isAdmin: user.metadata.isAdmin,
							};
						},
					},
					jwks: {
						keyPairConfig: {
							alg: 'RS256',
						},
					},
				}),
			],
			database: {
				db: config.database.withoutPlugins(),
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
			global: true,
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
