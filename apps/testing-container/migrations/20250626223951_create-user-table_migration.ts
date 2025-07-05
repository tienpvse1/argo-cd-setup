import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.createTable('user')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('email', 'text', (col) => col.notNull())
		.addColumn('emailVerified', 'boolean', (col) => col.notNull())
		.addColumn('image', 'text')
		.addColumn('createdAt', 'timestamp', (col) => col.notNull())
		.addColumn('updatedAt', 'timestamp', (col) => col.notNull())
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.withSchema('public').dropTable('user').execute();
}
