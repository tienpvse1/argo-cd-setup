import { BetterAuthInstance, InjectBetterAuth } from '@auth';
import { AuthOutboundPort } from '@modules/auth/applications/ports/auth.outbound-port';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { UserExists } from '@modules/auth/domains/errors/user-existed.error';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { APIError } from 'better-auth/api';
import { Request } from 'express';
import { BetterAuthMapper } from './mapper';

@Injectable()
export class BetterAuthInfrastructure implements AuthOutboundPort {
	constructor(
		@InjectBetterAuth() private readonly betterAuth: BetterAuthInstance,
	) {}

	async login(input: { email: string; password: string }): Promise<AuthEntity> {
		const response = await this.betterAuth.api.signInEmail({
			body: {
				email: input.email,
				password: input.password,
			},
		});

		const { token } = await this.betterAuth.api.getToken({
			headers: {
				authorization: `Bearer ${response.token}`,
			},
		});
		response.token = token;
		return BetterAuthMapper.entityFromSignIn(response);
	}

	async register(input: {
		name: string;
		email: string;
		password: string;
	}): Promise<AuthEntity> {
		try {
			const response = await this.betterAuth.api.signUpEmail({
				body: {
					name: input.name,
					email: input.email,
					password: input.password,
				},
			});
			return BetterAuthMapper.entityFromSignIn({
				user: response.user,
				token: response.token || '',
				redirect: false,
				url: undefined,
			});
		} catch (error) {
			if (error instanceof APIError) {
				throw new UserExists();
			}
			throw new InternalServerErrorException();
		}
	}

	async logout(request: Request): Promise<boolean> {
		const response = await this.betterAuth.api.signOut({
			headers: request.headers as Record<string, string>,
		});
		return response.success;
	}
}
