import { BetterAuthModule } from '@auth';
import { KyselyInjectToken, KyselyInstance, KyselyModule } from '@kysely';

export const AuthModule = BetterAuthModule.registerAsync({
	imports: [KyselyModule],
	inject: [KyselyInjectToken],
	useFactory(kyselyInstance: KyselyInstance) {
		return {
			database: kyselyInstance,
		};
	},
});
