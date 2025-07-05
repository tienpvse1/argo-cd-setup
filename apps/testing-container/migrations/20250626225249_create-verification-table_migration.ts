import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.createTable('verification')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('identifier', 'text', (col) => col.notNull())
		.addColumn('value', 'text', (col) => col.notNull())
		.addColumn('expiresAt', 'timestamp', (col) => col.notNull())
		.addColumn('createdAt', 'timestamp', (col) => col.notNull())
		.addColumn('updatedAt', 'timestamp', (col) => col.notNull())
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.withSchema('public').dropTable('verification').execute();
}
