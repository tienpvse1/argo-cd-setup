import { initAuth } from '@auth';
import { setupDocs } from '@common/api-docs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	setupDocs(app);
	initAuth(app);

	await app.listen(process.env.PORT ?? 3000);
	return;
}
bootstrap();
