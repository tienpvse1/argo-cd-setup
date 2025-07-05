import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.alterTable('user')
		.addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.alterTable('user')
		.dropColumn('metadata')
		.execute();
}
