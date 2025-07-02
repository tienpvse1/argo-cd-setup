import { KyselyInstance } from '@kysely';
import { ConfigurableModuleBuilder } from '@nestjs/common';

type PermissionModuleConfig = {
	kysely: KyselyInstance;
};

export const {
	ConfigurableModuleClass,
	OPTIONS_TYPE,
	ASYNC_OPTIONS_TYPE,
	MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<PermissionModuleConfig>().build();
