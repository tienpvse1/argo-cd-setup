import { Module } from '@nestjs/common';
import { AuthInfraModule } from '../infrastructures/auth.infra-module';
import { AuthService } from './auth.service';

@Module({
	providers: [AuthService],
	exports: [AuthService],
	imports: [AuthInfraModule.withAuthAdapter('better-auth')],
})
export class AuthApplicationModule {}
