import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';

type BetterAuthSignInResponse = {
	redirect: boolean;
	token: string;
	url: string | undefined;
	user: {
		id: string;
		email: string;
		name: string;
		image: string | null | undefined;
		emailVerified: boolean;
		createdAt: Date;
		updatedAt: Date;
	};
};
export class BetterAuthMapper {
	static entityFromSignIn(response: BetterAuthSignInResponse): AuthEntity {
		return {
			accessToken: response.token,
			refreshToken: '',
			user: {
				email: response.user.email,
				name: response.user.name,
				id: response.user.id,
				roles: [],
			},
		};
	}
}
