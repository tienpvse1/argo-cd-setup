import { type INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { patchNestJsSwagger } from 'nestjs-zod';

/**
 * Setup API docs, default path is `/reference`
 * @param app nest application instance
 * @param path api docs path, default is `/reference`
 * */
export function setupDocs(app: INestApplication, path = '/reference') {
	patchNestJsSwagger();
	const config = new DocumentBuilder()
		.setTitle('API docs')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		path,
		apiReference({
			content: document,
			theme: 'bluePlanetTheme',
		}),
	);
	Logger.log(`API docs available at ${path}`, 'Scalar docs');
}
