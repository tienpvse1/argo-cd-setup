import { User as UserTable } from '@kysely';
import { User } from '../../domains/entities/user';

export class UserMapper {
	static toDomain(user: UserTable): User {
		return {
			id: user.id,
			firstName: user.firstName,
			metadata: {
				loginAt: new Date(),
				ip: user.metadata.ip ?? '',
			},
		};
	}

	static toDomains(users: UserTable[]): User[] {
		return users.map((user) => this.toDomain(user));
	}
}
