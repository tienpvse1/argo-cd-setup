export default function () {
	return {
		app: {
			host: process.env.APP_HOST,
		},
		betterAuth: {
			url: process.env.BETTER_AUTH_URL,
		},
		postgres: {
			host: process.env.POSTGRES_HOST,
			port: +(process.env.POSTGRES_PORT ?? '5432'),
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			db: process.env.POSTGRES_DB,
		},
	};
}
