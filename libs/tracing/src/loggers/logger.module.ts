import { DynamicModule, Module } from '@nestjs/common';
import { Resource } from '@opentelemetry/resources';
import { createLogger } from './logger.service';

type OtelLoggerConfig = {
	resource: Resource;
};

export const OTEL_LOGGER = Symbol('otel logger inject token');

/**
 * Module to register OtelLogger
 * - provides `OTEL_LOGGER` inject token
 * */
@Module({})
export class OtelLoggerModule {
	static forRoot(config: OtelLoggerConfig): DynamicModule {
		return {
			module: OtelLoggerModule,
			providers: [
				{
					provide: OTEL_LOGGER,
					useValue: createLogger(config.resource),
				},
			],
			exports: [OTEL_LOGGER],
		};
	}
}
