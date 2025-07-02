import { KyselyInstance } from '@kysely';
import { ConfigurableModuleBuilder } from '@nestjs/common';

type BetterAuthConfig = {
	database: KyselyInstance;
};

export const BetterAuthModuleTemplate =
	new ConfigurableModuleBuilder<BetterAuthConfig>().build();
