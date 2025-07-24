import { Logger } from '@nestjs/common';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
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
		traceExporter: new OTLPTraceExporter(),
		metricReader: new PeriodicExportingMetricReader({
			exporter: new OTLPMetricExporter(),
		}),
		instrumentations: [
			getNodeAutoInstrumentations({
				'@opentelemetry/instrumentation-http': {
					ignoreIncomingRequestHook: (request) => {
						if (request.url === '/favicon.ico') {
							return true;
						}
						return false;
					},
				},
			}),
		],
	});

	otelSDK.start();

	function shutdownOtel() {
		otelSDK.shutdown().then(
			() => Logger.log('SDK shutdown successfully'),
			(e) => Logger.error('Cannot shutdown SDK', e),
		);
	}

	process.on('SIGINT', shutdownOtel);
	process.on('SIGTERM', shutdownOtel);
	return otelSDK;
}
