import { User } from '@kysely';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';

export class DefaultAuthMapper {
	static entityFromSignIn(response: User): AuthEntity {
		return {
			accessToken: '',
			refreshToken: '',
			user: {
				email: '',
				name: response.firstName,
				id: response.id.toString(),
				roles: [],
			},
		};
	}
}
