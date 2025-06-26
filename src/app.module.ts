import { BetterAuthModule } from '@auth';
import { KyselyModule } from '@kysely';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import config from 'src/config/env.config';
import { UserModule } from './modules/user/user.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
		}),
		KyselyModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					host: config.getOrThrow<string>('postgres.host'),
					port: config.getOrThrow<number>('postgres.port'),
					user: config.getOrThrow<string>('postgres.user'),
					password: config.getOrThrow<string>('postgres.password'),
					database: config.getOrThrow<string>('postgres.db'),
					max: config.get<number>('postgres.max'),
				};
			},
		}),

		BetterAuthModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory(config: ConfigService) {
				return {
					database: {
						host: config.getOrThrow<string>('postgres.host'),
						port: config.getOrThrow<number>('postgres.port'),
						user: config.getOrThrow<string>('postgres.user'),
						password: config.getOrThrow<string>('postgres.password'),
						database: config.getOrThrow<string>('postgres.db'),
						max: config.get<number>('postgres.max'),
					},
				};
			},
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
	],
})
export class AppModule { }
