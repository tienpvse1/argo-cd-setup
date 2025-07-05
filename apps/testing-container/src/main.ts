import { initAuth } from '@auth';
import { NestFactory } from '@nestjs/core';
import { setupDocs } from '@third-parties/api-docs';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setupDocs(app);
	initAuth(app);

	await app.listen(process.env.PORT ?? 4000);
	return;
}
bootstrap();
