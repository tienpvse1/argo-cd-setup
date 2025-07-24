import { Database, InjectKysely } from '@kysely';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { SpanStatusCode } from '@opentelemetry/api';
import { Kysely } from 'kysely';
import { Span, TraceService } from 'nestjs-otel';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
	constructor(
		@InjectKysely() private readonly db: Kysely<Database>,
		private readonly traceService: TraceService,
		private http: HttpService,
	) {}

	@Span()
	async getHello() {
		await this.createOrder();
		const result = await this.db
			.selectFrom('user')
			.selectAll()
			.limit(10)
			.execute();
		return result;
	}

	@Span()
	private async createOrder() {
		const span = this.traceService.getSpan();

		try {
			const result = await lastValueFrom(
				this.http.post('http://127.0.0.1:3000', {
					items: [
						{
							productId: '',
							quantity: 1,
						},
					],
				}),
			);
			return result;
		} catch (e) {
			if (e instanceof Error) span?.recordException(e);
			span?.setStatus({
				code: SpanStatusCode.ERROR,
				message: e.message,
			});
		} finally {
			span?.end();
		}
	}
}
