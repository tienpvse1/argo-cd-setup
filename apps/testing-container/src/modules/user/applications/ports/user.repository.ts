import { UserEntity } from '@modules/user/domains/entities/user';

export type SearchUserInput = {
	q?: string;
	limit?: number;
	offset?: number;
};

export abstract class AbstractUserRepository {
	abstract findAll(filter: SearchUserInput): Promise<UserEntity[]>;
	abstract create(user: Omit<UserEntity, 'id'>): Promise<UserEntity>;
}
