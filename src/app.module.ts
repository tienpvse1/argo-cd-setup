import { PolicyGuard } from '@auth/permission/permission.guard';
import { AuthModule } from '@common/auth.module-config';
import { I18nModule } from '@common/i18n.module-config';
import { DatabaseModule } from '@common/kysely.module-config';
import { AuthModule as ExposedAuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/auth.guard';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { resolveEnv } from '@utils/resolve-env';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import config from 'src/config/env.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config],
			envFilePath: resolveEnv(),
			isGlobal: true,
		}),
		DatabaseModule,
		AuthModule,
		I18nModule,
		UserModule,
		ExposedAuthModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
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
