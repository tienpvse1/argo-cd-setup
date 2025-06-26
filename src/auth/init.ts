import { INestApplication } from '@nestjs/common';
import type { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import express from 'express';
import { BetterAuthToken } from './better-auth.module';

export function initAuth(app: INestApplication) {
	const betterAuthInstance =
		app.get<ReturnType<typeof betterAuth>>(BetterAuthToken);
	const expressApp = express();
	expressApp.all('/api/auth/{*auth}', toNodeHandler(betterAuthInstance));
	app.use(expressApp);
}
