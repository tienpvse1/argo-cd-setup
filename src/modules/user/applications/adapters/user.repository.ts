import { User } from '@modules/user/domains/user';

export type SearchUserInput = {
	q?: string;
	limit?: number;
	offset?: number;
};

export abstract class AbstractUserRepository {
	abstract findAll(filter: SearchUserInput): Promise<User[]>;
	abstract create(user: Omit<User, 'id'>): Promise<User>;
}
