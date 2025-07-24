import { initializeOtel } from '@app/tracing';
import { initAuth } from '@auth';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setupDocs } from '@third-parties/api-docs';
import { AppModule } from './app.module';

async function bootstrap() {
	const otel = initializeOtel({
		version: '1.0.0',
		serviceName: 'testing_container',
	});
	otel.start();
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	setupDocs(app);
	initAuth(app);

	const port = configService.get('app.port');
	await app.listen(port);
	Logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
