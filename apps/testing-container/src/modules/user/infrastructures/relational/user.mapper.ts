import { User as UserTable } from '@kysely';
import { UserEntity } from '../../domains/entities/user';

export class UserMapper {
	static toDomain(user: UserTable): UserEntity {
		return {
			id: user.id,
			firstName: user.firstName,
			metadata: {
				loginAt: new Date(),
				ip: user.metadata.ip ?? '',
			},
		};
	}

	static toDomains(users: UserTable[]): UserEntity[] {
		return users.map((user) => this.toDomain(user));
	}
}
