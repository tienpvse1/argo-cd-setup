import { Database, InjectKysely } from '@kysely';
import { Injectable } from '@nestjs/common';
import { Kysely } from 'kysely';

@Injectable()
export class AppService {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}
	async getHello() {
		return this.db.selectFrom('user').selectAll().limit(10).execute();
	}
}
