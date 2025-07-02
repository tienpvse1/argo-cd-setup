import { Module } from '@nestjs/common';
import { AbstractUserRepository } from '../applications/ports/user.repository';
import { UserRelationalRepository } from './relational/user.repository';

@Module({
	providers: [
		{
			provide: AbstractUserRepository,
			useClass: UserRelationalRepository,
		},
	],
	exports: [AbstractUserRepository],
})
export class UserInfrastructureModule {}
