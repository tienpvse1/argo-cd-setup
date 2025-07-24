import { PolicyGuard } from '@auth/permission/permission.guard';
import { PermissionModule } from '@auth/permission/permission.module';
import { AuthModule } from '@common/auth.module-config';
import { I18nModule } from '@common/i18n.module-config';
import { DatabaseModule } from '@common/kysely.module-config';
import { JwtAuthGuard, JwtStrategy } from '@internal';
import { KyselyInstance } from '@kysely';
import { AuthModule as ExposedAuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { KyselyInjectToken } from '@third-parties/kysely';
import { OpenTelemetryModule } from 'nestjs-otel';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { resolveEnv } from '../src/config/resolve-env';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config/env.config';
import { HttpModule } from '@nestjs/axios';

@Module({
	imports: [
		CqrsModule.forRoot(),
		ConfigModule.forRoot({
			load: [config],
			envFilePath: resolveEnv(),
			isGlobal: true,
		}),
		PermissionModule.registerAsync({
			imports: [DatabaseModule],
			inject: [KyselyInjectToken],
			useFactory(kysely: KyselyInstance) {
				return {
					kysely,
				};
			},
		}),
		DatabaseModule,
		AuthModule,
		I18nModule,
		UserModule,
		ExposedAuthModule,
		HttpModule.register({}),
		OpenTelemetryModule.forRoot(),
	],
	controllers: [AppController],
	providers: [
		AppService,
		JwtStrategy,
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe,
		},
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_GUARD,
			useClass: PolicyGuard,
		},
		{ provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
	],
})
export class AppModule {}
