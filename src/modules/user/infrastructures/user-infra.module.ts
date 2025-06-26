import { Module } from '@nestjs/common';
import { AbstractUserRepository } from '../applications/adapters/user.repository';
import { UserRepository } from './user.repository';

@Module({
	providers: [
		{
			provide: AbstractUserRepository,
			useClass: UserRepository,
		},
	],
	exports: [],
})
export class UserInfrastructureModule {}
