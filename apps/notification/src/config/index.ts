export default () => ({
	services: {
		user: {
			host: process.env.USER_SERVICE_HOST || 'http://localhost:3000',
		},
	},
});
