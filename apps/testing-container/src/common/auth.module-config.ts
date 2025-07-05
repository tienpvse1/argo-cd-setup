import { BetterAuthModule } from '@auth';
import { KyselyInstance } from '@kysely';
import { KyselyInjectToken, KyselyModule } from '@third-parties/kysely';

export const AuthModule = BetterAuthModule.registerAsync({
	imports: [KyselyModule],
	inject: [KyselyInjectToken],
	useFactory(kyselyInstance: KyselyInstance) {
		return {
			database: kyselyInstance,
		};
	},
});
