import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { KyselyModule } from '@third-parties/kysely';
import { ZodValidationPipe } from 'nestjs-zod';
import config from './config/env.config';
import { resolveEnv } from './config/resolve-env';
import { OrderModule } from './modules/order/order.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			envFilePath: resolveEnv(),
			isGlobal: true,
		}),
		CqrsModule.forRoot(),
		KyselyModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					host: config.get<string>('postgres.host', 'localhost'),
					port: config.get<number>('postgres.port', 5432),
					user: config.get<string>('postgres.user', 'postgres'),
					password: config.get<string>('postgres.password', 'postgres'),
					database: config.get<string>('postgres.db', 'postgres'),
					max: config.get<number>('postgres.max'),
				};
			},
		}),
		OrderModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
})
export class OrderAppModule {}
