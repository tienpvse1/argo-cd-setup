import { DynamicModule, Inject, Module } from "@nestjs/common";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import {
	ASYNC_OPTIONS_TYPE,
	ConfigurableModuleClass,
	MODULE_OPTIONS_TOKEN,
	OPTIONS_TYPE,
} from "./module-definition";
import { Database } from "./schema"; // this is the Database interface we defined earlier

export const KYSEKY_INJECT_TOKEN = "KYSEKY_INJECT_TOKEN";

export function InjectKysely() {
	return Inject(KYSEKY_INJECT_TOKEN);
}

@Module({})
export class KyselyModule extends ConfigurableModuleClass {
	static register(options: typeof OPTIONS_TYPE): DynamicModule {
		const dialect = new PostgresDialect({
			pool: new Pool(options),
		});

		const db = new Kysely<Database>({
			dialect,
		});

		const moduleConfig = super.register(options);
		return {
			...moduleConfig,
			providers: [
				...(moduleConfig.providers ?? []),
				{
					provide: KYSEKY_INJECT_TOKEN,
					useValue: db,
				},
			],
			exports: [
				...(moduleConfig.exports ?? []),
				{
					provide: KYSEKY_INJECT_TOKEN,
					useValue: db,
				},
			],
		};
	}

	static registerAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
		const value = super.registerAsync(options);

		return {
			...value,
			global: true,
			providers: [
				...(value.providers ?? []),
				{
					provide: KYSEKY_INJECT_TOKEN,
					inject: [MODULE_OPTIONS_TOKEN],
					useFactory(options: typeof OPTIONS_TYPE) {
						const dialect = new PostgresDialect({
							pool: new Pool(options),
						});
						const db = new Kysely<Database>({
							dialect,
						});
						return db;
					},
				},
			],
			exports: [
				...(value.exports ?? []),
				{
					provide: KYSEKY_INJECT_TOKEN,
					inject: [MODULE_OPTIONS_TOKEN],
					useFactory(options: typeof OPTIONS_TYPE) {
						const dialect = new PostgresDialect({
							pool: new Pool(options),
						});
						const db = new Kysely<Database>({
							dialect,
						});
						return db;
					},
				},
			],
		};
	}
}
