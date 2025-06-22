import { Injectable } from '@nestjs/common';
import { InjectKysely } from './kysely/kysely.module';
import { Kysely } from 'kysely';
import { Database } from './kysely/schema';

@Injectable()
export class AppService {
  constructor(@InjectKysely() private readonly db: Kysely<Database>) {}
  async getHello() {
    return this.db.selectFrom('user').selectAll().limit(10).execute();
  }
}
