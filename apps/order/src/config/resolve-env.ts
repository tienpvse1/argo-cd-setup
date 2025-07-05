import 'dotenv/config';

export function resolveEnv(): string[] {
	return [`.env.order.${process.env.NODE_ENV}`, '.env.order'];
}
