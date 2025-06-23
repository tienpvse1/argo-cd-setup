import { Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { InjectKysely } from "./kysely/kysely.module";
import { Database } from "./kysely/schema";

@Injectable()
export class AppService {
	constructor(@InjectKysely() private readonly db: Kysely<Database>) {}
	async getHello() {
		return this.db.selectFrom("user").selectAll().limit(10).execute();
	}
}
