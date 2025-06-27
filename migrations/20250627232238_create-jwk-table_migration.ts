import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.createTable('jwks')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('publicKey', 'text', (col) => col.notNull())
		.addColumn('privateKey', 'text', (col) => col.notNull())
		.addColumn('createdAt', 'timestamp', (col) => col.notNull())
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.dropTable('jwks').execute();
}
