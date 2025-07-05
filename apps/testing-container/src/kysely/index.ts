import { Inject } from '@nestjs/common';
import { KyselyInjectToken } from '@third-parties/kysely';

export * from './schema';
export * from './type';
export function InjectKysely() {
	return Inject(KyselyInjectToken);
}
