import { Module } from '@nestjs/common';
import { UserInfrastructureModule } from '../infrastructures/user-infra.module';
import { UserService } from './user.service';

@Module({
	providers: [UserService],
	exports: [UserService],
	imports: [UserInfrastructureModule],
})
export class UserApplicationModule {}
