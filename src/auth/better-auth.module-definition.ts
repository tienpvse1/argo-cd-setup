import { ConfigurableModuleBuilder } from '@nestjs/common';

type BetterAuthConfig = {
	database: {
		host: string;
		port: number;
		user: string;
		password: string;
		database: string;
	};
};

export const BetterAuthModuleTemplate =
	new ConfigurableModuleBuilder<BetterAuthConfig>().build();
