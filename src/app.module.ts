import { AuthModule } from '@common/auth.module-config';
import { I18nModule } from '@common/i18n.module-config';
import { DatabaseModule } from '@common/kysely.module-config';
import { AuthModule as ExposedAuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
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
		{ provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
	],
})
export class AppModule {}
