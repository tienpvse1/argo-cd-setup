import { BetterAuthModule } from '@auth';
import { KYSEKY_INJECT_TOKEN, KyselyInstance, KyselyModule } from '@kysely';

export const AuthModule = BetterAuthModule.registerAsync({
	imports: [KyselyModule],
	inject: [KYSEKY_INJECT_TOKEN],
	useFactory(kyselyInstance: KyselyInstance) {
		return {
			database: kyselyInstance,
		};
	},
});
