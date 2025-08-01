import { DynamicModule, Inject, Module, Provider } from '@nestjs/common';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import {
	ASYNC_OPTIONS_TYPE,
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
} from './module-definition';

export const KyselyInjectToken = 'KYSEKY_INJECT_TOKEN';

export function InjectKysely() {
	return Inject(KyselyInjectToken);
}

function fromOption(options: typeof OPTIONS_TYPE) {
	const pool = new Pool(options);
	const dialect = new PostgresDialect({
		pool,
	});
	return new Kysely({
		dialect,
		plugins: [new CamelCasePlugin()],
	});
}

@Module({})
export class KyselyModule extends ConfigurableModuleClass {
	static register(options: typeof OPTIONS_TYPE): DynamicModule {
		const orginal = super.register(options);
		const originalProviders = orginal.providers ?? [];
		const originalExports = orginal.exports ?? [];
		const dbProvider = {
			provide: KyselyInjectToken,
			useValue: fromOption(options),
		};

		const moduleConfig = super.register(options);
		return {
			...moduleConfig,
			global: true,
			providers: [...originalProviders, dbProvider],
			exports: [...originalExports, dbProvider],
		};
	}

	static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
		const original = super.registerAsync(options);
		const originalProviders = original.providers ?? [];
		const originalExports = original.exports ?? [];

		const databaseProvider: Provider = {
			provide: KyselyInjectToken,
			inject: [MODULE_OPTIONS_TOKEN],
			useFactory(options: typeof OPTIONS_TYPE) {
				return fromOption(options);
			},
		};

		return {
			...original,
			global: true,
			providers: [...originalProviders, databaseProvider],
			exports: [...originalExports, databaseProvider],
		};
	}
}
