import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.withSchema('public')
		.createTable('role')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('updated_at', 'timestamp', (col) => col.notNull())
		.addColumn('is_active', 'boolean', (col) => col.notNull())
		.execute();

	await db.schema
		.withSchema('public')
		.createTable('permission')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('can', 'text', (col) => col.notNull())
		.addColumn('subject', 'text', (col) => col.notNull())
		.addColumn('role_id', 'text', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('updated_at', 'timestamp', (col) => col.notNull())
		.addColumn('is_active', 'boolean', (col) => col.notNull())
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.withSchema('public').dropTable('permission').execute();
	await db.withSchema('public').schema.dropTable('role').execute();
}
