import { ConfigurableModuleBuilder } from '@nestjs/common';

type KyselyModuleOptions = {
  database: string;
  host: string;
  user: string;
  port: number;
  password: string;
  max?: number;
};
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<KyselyModuleOptions>().build();
