import { KyselyModule } from '@kysely';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const DatabaseModule = KyselyModule.registerAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory(config: ConfigService) {
		return {
			host: config.getOrThrow<string>('postgres.host'),
			port: config.getOrThrow<number>('postgres.port'),
			user: config.getOrThrow<string>('postgres.user'),
			password: config.getOrThrow<string>('postgres.password'),
			database: config.getOrThrow<string>('postgres.db'),
			max: config.get<number>('postgres.max'),
		};
	},
});
