import { type INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { patchNestJsSwagger } from 'nestjs-zod';


export type ApiDocsOptions = {
	title?: string;
	version?: string;
	description?: string;
	path?: string;
	theme?: string;
}

/**
 * Setup API docs, default path is `/reference`
 * @param app nest application instance
 * @param path api docs path, default is `/reference`
 * */
export function setupDocs(app: INestApplication, options: ApiDocsOptions = {}) {
	const path = options.path ?? '/reference';
	patchNestJsSwagger();
	const config = new DocumentBuilder()
		.setTitle(options.title ?? 'API Docs')
		.setVersion(options.version ?? '1.0')
		.setDescription(options.description ?? '')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);

	app.use(
		path,
		apiReference({
			content: document,
			theme: options.theme ?? 'bluePlanetTheme',
		}),
	);
	Logger.log(`API docs available at ${path}`, 'Scalar docs');
}
