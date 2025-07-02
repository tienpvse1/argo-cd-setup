import { Module } from '@nestjs/common';
import { AuthInfraModule } from '../infrastructures/auth.infra-module';
import { AuthEventHandlers } from './event-handlers';
import { AuthUseCases } from './use-cases';

@Module({
	providers: [...AuthUseCases, ...AuthEventHandlers],
	imports: [AuthInfraModule.withAuthAdapter('better-auth')],
})
export class AuthApplicationModule {}
