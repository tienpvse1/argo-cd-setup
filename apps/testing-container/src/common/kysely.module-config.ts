import { ConfigModule, ConfigService } from '@nestjs/config';
import { KyselyModule } from '@third-parties/kysely';

export const DatabaseModule = KyselyModule.registerAsync({
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory(config: ConfigService) {
		return {
			host: config.get<string>('postgres.host', 'localhost'),
			port: config.get<number>('postgres.port', 5432),
			user: config.get<string>('postgres.user', 'postgres'),
			password: config.get<string>('postgres.password', 'postgres'),
			database: config.get<string>('postgres.db', 'postgres'),
			max: config.get<number>('postgres.max'),
		};
	},
});
