import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema.createSchema('order').execute();
	await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
	await db.schema
		.withSchema('order')
		.createTable('order')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('name', 'text', (col) => col.notNull())
		.addColumn('email', 'text', (col) => col.notNull())
		.addColumn('phone', 'text', (col) => col.notNull())
		.addColumn('address', 'text', (col) => col.notNull())
		.addColumn('status', 'text', (col) => col.notNull())
		.addColumn('user_id', 'text', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('updated_at', 'timestamp', (col) => col.notNull())
		.addColumn('deleted_at', 'timestamp', (col) => col.defaultTo(null))
		.execute();

	await db.schema
		.withSchema('order')
		.createTable('order_item')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('order_id', 'text', (col) => col.notNull())
		.addColumn('product_id', 'uuid', (col) => col.notNull())
		.addColumn('quantity', 'integer', (col) => col.notNull())
		.addColumn('created_at', 'timestamp', (col) => col.notNull())
		.addColumn('updated_at', 'timestamp', (col) => col.notNull())
		.addColumn('deleted_at', 'timestamp', (col) => col.defaultTo(null))
		.addForeignKeyConstraint('order_id_fk', ['order_id'], 'order', ['id'])
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.withSchema('order').dropTable('order_item').execute();
	await db.schema.withSchema('order').dropTable('order').execute();
	await sql`DROP EXTENSION IF EXISTS "uuid-ossp"`.execute(db);
	await db.schema.dropSchema('order').execute();
}
