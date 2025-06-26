import { Kysely } from 'kysely';

export async function up(db: Kysely<unknown>) {
	await db.schema
		.createTable('session')
		.addColumn('id', 'text', (col) => col.primaryKey())
		.addColumn('userId', 'text', (col) => col.notNull())
		.addColumn('token', 'text', (col) => col.notNull())
		.addColumn('expiresAt', 'timestamp', (col) => col.notNull())
		.addColumn('ipAddress', 'text')
		.addColumn('userAgent', 'text')
		.addColumn('createdAt', 'timestamp', (col) => col.notNull())
		.addColumn('updatedAt', 'timestamp', (col) => col.notNull())
		.addForeignKeyConstraint('user_id_fk', ['userId'], 'user', ['id'])
		.execute();
}
export async function down(db: Kysely<unknown>) {
	await db.schema.dropTable('session').execute();
}
