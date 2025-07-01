import { InjectKysely, KyselyInstance } from '@kysely';
import { Injectable } from '@nestjs/common';
import {
	AbstractUserRepository,
	SearchUserInput,
} from '../../applications/ports/user.repository';
import { UserEntity } from '../../domains/entities/user';
import { SearchUserSchema } from './inputs/search-user.input';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRelationalRepository implements AbstractUserRepository {
	constructor(@InjectKysely() private readonly kysely: KyselyInstance) {}

	async findAll(input: SearchUserInput): Promise<UserEntity[]> {
		const parsedInput = SearchUserSchema.safeParse(input);
		if (parsedInput.error) throw new Error('invalid filter');
		let query = this.kysely.selectFrom('user').selectAll();

		if (parsedInput.data.q) {
			query = query.where((eb) =>
				eb.or([
					eb('firstName', 'like', `%${parsedInput.data.q}%`),
					eb('lastName', 'like', `%${parsedInput.data.q}%`),
				]),
			);
		}
		const users = await query.execute();
		return UserMapper.toDomains(users);
	}

	async create(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
		const createdUser = await this.kysely
			.insertInto('user')
			.values({
				firstName: user.firstName,
				gender: 'other',
				metadata: JSON.stringify(user.metadata),
			})
			.returningAll()
			.executeTakeFirstOrThrow();
		return UserMapper.toDomain(createdUser);
	}
}
