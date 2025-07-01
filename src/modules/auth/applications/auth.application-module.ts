import { Module } from '@nestjs/common';
import { AuthInfraModule } from '../infrastructures/auth.infra-module';
import { AuthUseCases } from './use-cases';

@Module({
	providers: [...AuthUseCases],
	imports: [AuthInfraModule.withAuthAdapter('better-auth')],
})
export class AuthApplicationModule {}
