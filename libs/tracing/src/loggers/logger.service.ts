import { ConsoleLogger, LogLevel, Type } from '@nestjs/common';
import { SeverityNumber } from '@opentelemetry/api-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-proto';
import { Resource } from '@opentelemetry/resources';
import {
	BatchLogRecordProcessor,
	LoggerProvider,
} from '@opentelemetry/sdk-logs';

export function createLogger(resource: Resource): Type<ConsoleLogger> {
	const loggerProvider = new LoggerProvider({
		resource: resource,
		processors: [new BatchLogRecordProcessor(new OTLPLogExporter())],
	});
	const logger = loggerProvider.getLogger('default');

	class OtelLogger extends ConsoleLogger {
		private mapLogLevel(logLevel?: LogLevel): SeverityNumber {
			switch (logLevel) {
				case 'error':
					return SeverityNumber.ERROR;
				case 'warn':
					return SeverityNumber.WARN;
				case 'log':
					return SeverityNumber.INFO;
				case 'debug':
					return SeverityNumber.DEBUG;
				case 'verbose':
					return SeverityNumber.DEBUG2;
				default:
					return SeverityNumber.DEBUG;
			}
		}

		protected override printMessages(
			messages: unknown[],
			context?: string,
			logLevel?: LogLevel,
			writeStreamType?: 'stdout' | 'stderr',
			errorStack?: unknown,
		): void {
			for (const message of messages) {
				logger.emit({
					severityNumber: this.mapLogLevel(logLevel),
					severityText: logLevel,
					body: typeof message === 'string' ? message : JSON.stringify(message),
					attributes: {
						context: this.context,
					},
				});
			}
			super.printMessages(
				messages,
				context,
				logLevel,
				writeStreamType,
				errorStack,
			);
		}
	}
	return OtelLogger;
}
