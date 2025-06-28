import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.alterTable('user')
		.addColumn('metadata', 'jsonb', (col) => col.defaultTo('{}'))
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.alterTable('user').dropColumn('metadata').execute();
}
