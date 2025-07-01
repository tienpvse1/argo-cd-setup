import { InjectKysely, KyselyInstance } from '@kysely';
import { AuthOutboundPort } from '@modules/auth/applications/ports/auth.outbound-port';
import { AuthEntity } from '@modules/auth/domains/entities/auth.entity';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DefaultAuthMapper } from './mapper';

@Injectable()
export class DefaultAuthInfrastructure implements AuthOutboundPort {
	constructor(@InjectKysely() private readonly kysely: KyselyInstance) {}
	updateRole(userId: string, role: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

	async login(_input: {
		email: string;
		password: string;
	}): Promise<AuthEntity> {
		const user = await this.kysely
			.selectFrom('user')
			.selectAll()
			.executeTakeFirst();

		if (!user) {
			throw new Error('User not found');
		}
		return DefaultAuthMapper.entityFromSignIn(user);
	}

	async register(_input: {
		name: string;
		email: string;
		password: string;
	}): Promise<AuthEntity> {
		throw new Error('Method not implemented.');
	}

	async logout(_request: Request): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
}
