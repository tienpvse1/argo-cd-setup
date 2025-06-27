import 'dotenv/config';

export function resolveEnv(): string[] {
	return [`.env.${process.env.NODE_ENV}`, '.env'];
}
