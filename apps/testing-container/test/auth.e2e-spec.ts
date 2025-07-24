import { faker } from '@faker-js/faker';
import { HttpStatus } from '@nestjs/common';
import { expect, test } from '@playwright/test';

test('Signup', async ({ request }) => {
	const invalidEmailPayload = {
		email: 'johndoe',
		password: faker.internet.password(),
		name: faker.internet.username(),
	};

	const invalidEmailResponse = await request.post('/auth/sign-up', {
		data: invalidEmailPayload,
	});
	expect(invalidEmailResponse.status(), 'Should return 400').toBe(
		HttpStatus.BAD_REQUEST,
	);

	const signupPayload = {
		email: faker.internet.email(),
		password: faker.internet.password(),
		name: faker.internet.username(),
	};

	const response = await request.post('/auth/sign-up', {
		data: signupPayload,
	});
	expect(response.status(), 'Should return 201').toBe(HttpStatus.CREATED);
});

test('Login', async ({ request }) => {
	const unauthorizedPayload = {
		email: 'zDj9o@example.com',
		password: 'password',
	};

	const response = await request.post('/auth/login', {
		data: unauthorizedPayload,
	});
	expect(response.status(), 'Should return 401').toBe(HttpStatus.UNAUTHORIZED);

	const authorizedPayload = {
		email: 'good66612@gmail.com',
		password: 'Username666',
	};

	const authorizedResponse = await request.post('/auth/login', {
		data: authorizedPayload,
	});
	expect(authorizedResponse.status(), 'Should return 200').toBe(HttpStatus.OK);
});
