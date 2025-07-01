import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '../infrastructures/user-infra.module';
import { UserUseCases } from './use-cases';

@Module({
	providers: [...UserUseCases],
	imports: [UserInfrastructureModule],
})
export class UserApplicationModule {}
