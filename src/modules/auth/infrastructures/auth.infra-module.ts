import { DynamicModule, Module } from '@nestjs/common';
import { AuthOutboundPort } from '../applications/ports/auth.outbound-port';
import { BetterAuthInfrastructure } from './better-auth/better-auth.infra';
import { DefaultAuthInfrastructure } from './custom-auth/default-auth.infra';

@Module({})
export class AuthInfraModule {
	static withAuthAdapter(adapter: 'better-auth'): DynamicModule {
		if (adapter === 'better-auth') {
			return {
				module: AuthInfraModule,
				providers: [
					{
						provide: AuthOutboundPort,
						useClass: BetterAuthInfrastructure,
					},
				],
				exports: [AuthOutboundPort],
			};
		}
		return {
			module: AuthInfraModule,
			providers: [
				{
					provide: AuthOutboundPort,
					useClass: DefaultAuthInfrastructure,
				},
			],
			exports: [AuthOutboundPort],
		};
	}
}
