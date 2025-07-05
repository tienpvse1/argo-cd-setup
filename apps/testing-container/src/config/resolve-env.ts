import 'dotenv/config';

export function resolveEnv(): string[] {
	return [`.env.core.${process.env.NODE_ENV}`, '.env.core'];
}
