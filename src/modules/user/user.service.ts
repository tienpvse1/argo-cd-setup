import { Database, InjectKysely } from '@kysely';
import { Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';

@Injectable()
export class UserService {
	constructor(@InjectKysely() private readonly kysely: Kysely<Database>) {}

	async findAll() {
		return this.kysely.selectFrom('user').selectAll().execute();
	}
}
