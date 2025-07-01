import { UserEntity } from '@modules/user/domains/entities/user';
import { SearchUserQuery } from '@modules/user/domains/queries/search-user.query';
import { IQueryHandler } from '@nestjs/cqrs';
import { AbstractUserRepository } from '../ports/user.repository';

export class SearchUserHandler implements IQueryHandler<SearchUserQuery> {
	constructor(private readonly userRepository: AbstractUserRepository) {}

	execute(query: SearchUserQuery): Promise<UserEntity[]> {
		return this.userRepository.findAll(query);
	}
}
