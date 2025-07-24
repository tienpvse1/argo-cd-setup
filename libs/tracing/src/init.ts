import process from 'node:process';
import { Logger } from '@nestjs/common';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import {
	ATTR_SERVICE_NAME,
	ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';

interface OtelConfig {
	serviceName: string;
	version: string;
}

export function initializeOtel(config: OtelConfig) {
	const resource = resourceFromAttributes({
		[ATTR_SERVICE_NAME]: config.serviceName,
		[ATTR_SERVICE_VERSION]: config.version,
	});

	const otelSDK = new NodeSDK({
		resource: resource,
		traceExporter: new ZipkinExporter(),
		instrumentations: [getNodeAutoInstrumentations()],
	});

	function shutdonwOtel() {
		otelSDK
			.shutdown()
			.then(
				() => Logger.log('SDK shut down successfully'),
				(err) => Logger.log('Error shutting down SDK', err),
			)
			.finally(() => process.exit(0));
	}

	process.on('SIGINT', shutdonwOtel);
	process.on('SIGTERM', shutdonwOtel);
	return otelSDK;
}
