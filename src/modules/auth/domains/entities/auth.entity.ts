export class AuthEntity {
	accessToken: string;
	refreshToken: string;
	user: {
		id: string;
		name: string;
		email: string;
		roles: string[];
	};
}
